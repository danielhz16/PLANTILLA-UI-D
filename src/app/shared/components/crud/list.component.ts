import { Component, input, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { MainCardComponent } from '@components/cards/main-card.component';
import { MainTitleBarComponent } from '@components/crud/main-title-bar.component';
import { MainTableComponent } from '@components/tables/main-table.component';
import { ListQuery, ListQueryFactory } from '@services/list-query.service';
import { ListRegistry } from '@services/list-registry.service';
import { ColumnConfig } from '@shared/types/table';

export interface ListProps {
  endpoint: string;
  title: string;
  queryKey: string;
  columns: ColumnConfig<Record<string, unknown>>[];
  toCreate?: string;
  name?: string;
  permission?: string;
  minDataFetch?: number;
  initialFilter?: Record<string, unknown>;
  disabledButtonStatus?: boolean;
}

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    MainCardComponent,
    MainTitleBarComponent,
    MainTableComponent,
  ],
  template: `
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <app-main-card>
        <app-main-title-bar
          [title]="title()"
          [toCreate]="toCreate()"
          [name]="name()"
          [permission]="permission()"
          [get]="getFn"
          [isPending]="list()?.isLoading() ?? false"
          [disabledButtonStatus]="disabledButtonStatus()"
          [statusActive]="statusActive()"
          [toggleStatus]="toggleStatusFn"
        ></app-main-title-bar>
      </app-main-card>

      <app-main-card [padding]="'1rem'">
        <app-main-table
          [data]="list()?.data() ?? []"
          [columns]="columns()"
          [isLoading]="list()?.isLoading() ?? false"
          [isFetched]="list()?.isFetched() ?? false"
          [columnFilters]="list()?.columnFilters() ?? {}"
          [onColumnFilterChange]="onColumnFilterChange"
          [onColumnFilterBlur]="onColumnFilterBlur"
          [page]="list()?.page() ?? 1"
          [pageSize]="list()?.pageSize() ?? 10"
          [totalPages]="list()?.totalPages() ?? 0"
          [totalRecords]="list()?.totalRecords() ?? 0"
          [onPageChange]="onPageChange"
          [onPageSizeChange]="onPageSizeChange"
          [name]="name()"
        ></app-main-table>
      </app-main-card>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `],
})
export class ListComponent implements OnInit, OnDestroy {
  endpoint = input('');
  title = input('');
  queryKey = input('');
  columns = input<ColumnConfig<Record<string, unknown>>[]>([]);
  toCreate = input<string | undefined>(undefined);
  name = input<string | undefined>(undefined);
  permission = input<string | undefined>(undefined);
  minDataFetch = input<number | undefined>(undefined);
  initialFilter = input<Record<string, unknown> | undefined>(undefined);
  disabledButtonStatus = input(false);

  readonly list = signal<ListQuery<Record<string, unknown>> | null>(null);

  readonly statusActive = computed(
    () => String(this.list()?.filters()['active'] ?? true) !== 'false',
  );

  constructor(
    private listFactory: ListQueryFactory,
    private registry: ListRegistry,
  ) {}

  ngOnInit(): void {
    const list = this.listFactory.create<Record<string, unknown>>({
      url: this.endpoint(),
      key: this.queryKey(),
      minDataFetch: this.minDataFetch(),
    });

    const initial = this.initialFilter();
    if (initial) {
      Object.entries(initial).forEach(([key, value]) => {
        list.addFilter(key, value);
      });
    }

    list.init();
    this.list.set(list);
    this.registry.register(this.queryKey(), list);
  }

  ngOnDestroy(): void {
    this.registry.unregister(this.queryKey());
  }

  readonly getFn = () => {
    this.list()?.refetch();
  };

  readonly onColumnFilterChange = (name: string, value: string) => {
    this.list()?.onColumnFilterChange(name, value);
  };

  readonly onColumnFilterBlur = (name: string, value: string) => {
    this.list()?.onColumnFilterBlur(name, value);
  };

  readonly onPageChange = (page: number) => {
    this.list()?.setPage(page);
  };

  readonly onPageSizeChange = (pageSize: number) => {
    this.list()?.setPageSize(pageSize);
  };

  readonly toggleStatusFn = () => {
    const next = !this.statusActive();
    this.list()?.setFilters({ active: next });
  };
}