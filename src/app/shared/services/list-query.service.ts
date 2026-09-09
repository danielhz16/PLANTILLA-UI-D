import { Injectable, signal, computed, Signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ApiService } from '@services/api.service';
import { QueryCache, CacheScope } from '@services/query-cache.service';
import { constructUrlFilter } from '@services/construct-url-filter';

interface DataResponse<T> {
  data?: T[];
  info?: { count?: number };
  total?: number;
  count?: number;
}

const DEFAULT_PAGE_SIZE = 10;
const PAGE_FETCH_WINDOW = 3;

export interface ListQueryOptions {
  url: string;
  key: string;
  enabled?: boolean;
  minDataFetch?: number;
  pageSize?: number;
}

@Injectable({ providedIn: 'root' })
export class ListQueryFactory {
  constructor(
    private api: ApiService,
    private cache: QueryCache,
  ) {}

  create<T>(
    options: ListQueryOptions,
  ): ListQuery<T> {
    return new ListQuery<T>(this.api, this.cache, options);
  }
}

export class ListQuery<T> {
  readonly data = signal<T[]>([]);
  readonly rawData = signal<T[]>([]);
  readonly isLoading = signal(false);
  readonly isFetched = signal(false);
  readonly isFetching = signal(false);
  readonly error = signal<unknown>(null);
  readonly totalRecords = signal(0);
  readonly columnFilters = signal<Record<string, string>>({});
  readonly filters = signal<Record<string, unknown>>({});
  readonly page = signal(1);
  readonly pageSize: Signal<number>;

  readonly totalPages = computed(() => {
    const total = this.totalRecords();
    const pageSize = this.pageSize();
    return total > 0 ? Math.ceil(total / pageSize) : 0;
  });

  readonly hasNextPage = computed(() => {
    const total = this.totalRecords();
    const pageSize = this.pageSize();
    const page = this.page();
    return total > 0 ? page < this.totalPages() : this.rawData().length > (page - 1) * pageSize + pageSize;
  });

  private url: string;
  private key: string;
  private enabled: boolean;
  private minDataFetch?: number;
  private abortId = 0;
  private pageSizeSignal: ReturnType<typeof signal<number>>;

  constructor(
    private api: ApiService,
    private cache: QueryCache,
    options: ListQueryOptions,
  ) {
    this.url = options.url;
    this.key = options.key;
    this.enabled = options.enabled ?? true;
    this.minDataFetch = options.minDataFetch;
    this.pageSizeSignal = signal(options.pageSize ?? DEFAULT_PAGE_SIZE);
    this.pageSize = this.pageSizeSignal.asReadonly();
  }

  init(): void {
    void this.fetch();
  }

  async fetch(): Promise<void> {
    if (!this.enabled) return;
    const currentAbort = ++this.abortId;
    const tablePage = this.page();
    const tablePageSize = this.pageSize();
    const queryPage = Math.floor((tablePage - 1) / PAGE_FETCH_WINDOW) + 1;
    const queryPageSize = tablePageSize * PAGE_FETCH_WINDOW;
    const filters = this.effectiveFilters();
    const endpoint = constructUrlFilter(this.url, filters, queryPage, queryPageSize);
    const scope: CacheScope = { endpoint: this.url, page: queryPage, pageSize: queryPageSize, filters };

    if (this.cache.get<DataResponse<T>>(this.key, scope)) {
      this.resolveFromCache(scope, tablePage, tablePageSize);
      return;
    }

    this.isLoading.set(true);
    this.isFetching.set(true);
    try {
      const res = await firstValueFrom(this.api.request<DataResponse<T>>(endpoint, 'GET'));
      if (currentAbort !== this.abortId) return;
      const rows = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? (res as unknown as T[]) : [];
      const total = res?.info?.count ?? 0;
      this.cache.set(this.key, res, scope, total);
      this.rawData.set(rows);
      this.totalRecords.set(total);
      this.isFetched.set(true);
      this.slicePage(tablePage, tablePageSize);
    } catch (err) {
      if (currentAbort === this.abortId) this.error.set(err);
    } finally {
      if (currentAbort === this.abortId) {
        this.isLoading.set(false);
        this.isFetching.set(false);
      }
    }
  }

  private resolveFromCache(scope: CacheScope, tablePage: number, tablePageSize: number): void {
    const entry = this.cache.get<DataResponse<T>>(this.key, scope);
    if (!entry) return;
    const res = entry.data as DataResponse<T>;
    const rows = Array.isArray(res?.data) ? res.data : [];
    this.rawData.set(rows);
    this.totalRecords.set(entry.totalRecords);
    this.isFetched.set(true);
    this.slicePage(tablePage, tablePageSize);
  }

  private windowOffset(tablePage: number, tablePageSize: number): number {
    const rawLength = this.rawData().length;
    const isFullDataset = rawLength > tablePageSize * PAGE_FETCH_WINDOW;
    return isFullDataset
      ? (tablePage - 1) * tablePageSize
      : ((tablePage - 1) % PAGE_FETCH_WINDOW) * tablePageSize;
  }

  private slicePage(tablePage: number, tablePageSize: number): void {
    const offset = this.windowOffset(tablePage, tablePageSize);
    const paged = this.rawData().slice(offset, offset + tablePageSize);
    this.data.set(this.applyColumnFilters(paged));
  }

  private applyColumnFilters(rows: T[]): T[] {
    const filters = this.columnFilters();
    const active = Object.entries(filters).filter(([, value]) => value.trim() !== '');
    if (active.length === 0) return rows;
    return rows.filter((row) =>
      active.every(([name, value]) => {
        const field = (row as Record<string, unknown>)[name];
        return String(field ?? '').toLowerCase().includes(value.toLowerCase());
      }),
    );
  }

  private effectiveFilters(): Record<string, unknown> {
    return this.filters();
  }

  setPage(nextPage: number): void {
    this.page.set(Math.max(1, nextPage));
    void this.fetch();
  }

  setPageSize(nextPageSize: number): void {
    this.pageSizeSignal.set(nextPageSize);
    this.page.set(1);
    void this.fetch();
  }

  setFilters(nextFilters: Record<string, unknown>): void {
    this.filters.set({ ...this.filters(), ...nextFilters });
    this.page.set(1);
    void this.fetch();
  }

  addFilter(name: string, value: unknown): void {
    this.setFilters({ [name]: value });
  }

  removeFilter(name: string): void {
    const next = { ...this.filters() };
    delete next[name];
    this.filters.set(next);
    this.page.set(1);
    void this.fetch();
  }

  clearFilters(): void {
    this.filters.set({});
    this.columnFilters.set({});
    this.page.set(1);
    void this.fetch();
  }

  onColumnFilterChange(name: string, value: string): void {
    const next = { ...this.columnFilters(), [name]: value };
    this.columnFilters.set(next);
    const offset = this.windowOffset(this.page(), this.pageSize());
    this.data.set(this.applyColumnFilters(this.rawData().slice(offset, offset + this.pageSize())));
  }

  onColumnFilterBlur(name: string, value: string): void {
    this.filters.set({ ...this.filters(), [name]: value });
    this.page.set(1);
    void this.fetch();
  }

  refetch(): Promise<void> {
    return this.fetch();
  }
}