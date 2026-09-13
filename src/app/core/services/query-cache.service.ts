import { Injectable } from '@angular/core';

export type Filters = Record<string, unknown>;

export interface CacheScope {
  endpoint: string;
  page?: number;
  pageSize?: number;
  filters?: Filters;
}

export interface CacheEntry {
  key: string;
  scope?: CacheScope;
  data: unknown;
  totalRecords: number;
  updatedAt: number;
}

@Injectable({ providedIn: 'root' })
export class QueryCache {
  private readonly store = new Map<string, CacheEntry>();

  private scopeKey(key: string, scope?: CacheScope): string {
    if (!scope) return key;
    const normalized = normalizeScope(scope);
    return `${key}::${normalized.endpoint}|${normalized.page ?? 1}|${normalized.pageSize ?? 10}|${JSON.stringify(normalized.filters ?? {})}`;
  }

  get<T>(key: string, scope?: CacheScope): CacheEntry | null {
    return this.store.get(this.scopeKey(key, scope)) as CacheEntry | null;
  }

  getData<T>(key: string, scope?: CacheScope): T | null {
    const entry = this.store.get(this.scopeKey(key, scope));
    return entry ? (entry.data as T) : null;
  }

  set(key: string, data: unknown, scope?: CacheScope, totalRecords = 0): void {
    this.store.set(this.scopeKey(key, scope), {
      key,
      scope,
      data,
      totalRecords,
      updatedAt: Date.now(),
    });
  }

  findAll(key: string): CacheEntry[] {
    const prefix = `${key}::`;
    const result: CacheEntry[] = [];
    this.store.forEach((entry, cacheKey) => {
      if (cacheKey === key || cacheKey.startsWith(prefix)) {
        result.push(entry);
      }
    });
    return result;
  }

  remove(key: string, scope?: CacheScope): void {
    if (scope) {
      this.store.delete(this.scopeKey(key, scope));
      return;
    }
    const prefix = `${key}::`;
    this.store.forEach((_, cacheKey) => {
      if (cacheKey === key || cacheKey.startsWith(prefix)) {
        this.store.delete(cacheKey);
      }
    });
  }

  clear(): void {
    this.store.clear();
  }

  updateRows(key: string, updater: (rows: Record<string, unknown>[]) => Record<string, unknown>[], subProp?: string): void {
    const prefix = `${key}::`;
    this.store.forEach((entry, cacheKey) => {
      if (cacheKey !== key && !cacheKey.startsWith(prefix)) return;
      if (!entry.data || typeof entry.data !== 'object') return;
      const objectData = entry.data as Record<string, unknown>;
      const rowsKey = subProp ?? 'data';
      const rows = objectData[rowsKey];
      if (!Array.isArray(rows)) return;
      this.store.set(cacheKey, { ...entry, data: { ...objectData, [rowsKey]: updater(rows as Record<string, unknown>[]) }, updatedAt: Date.now() });
    });
  }
}

function normalizeValue(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.filter((item) => item !== null && item !== undefined).map((item) => normalizeValue(item));
  }
  if (value && typeof value === 'object') {
    return Object.keys(value as Record<string, unknown>).sort().reduce<Record<string, unknown>>((acc, key) => {
      const normalizedValue = normalizeValue((value as Record<string, unknown>)[key]);
      if (normalizedValue === undefined) return acc;
      acc[key] = normalizedValue;
      return acc;
    }, {});
  }
  return value;
}

function normalizeScope(scope: CacheScope): CacheScope {
  return {
    endpoint: scope.endpoint,
    page: scope.page,
    pageSize: scope.pageSize,
    filters: normalizeValue(scope.filters ?? {}) as Filters,
  };
}

export function createSmartQueryKey(key: string, scope?: CacheScope): string {
  return scope ? `${key}::${JSON.stringify(scope)}` : key;
}