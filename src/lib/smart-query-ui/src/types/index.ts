import type { QueryClient } from "@tanstack/react-query";

export type Primitive = string | number | boolean;

export type FilterValue =
    | Primitive
    | Primitive[]
    | Record<string, unknown>
    | null
    | undefined;

export type Filters = Record<string, FilterValue>;

export type CacheOptions = {
    enabled?: boolean;
    ttl?: number;
};

export type CacheScope = {
    endpoint: string;
    page?: number;
    pageSize?: number;
    filters?: Filters;
};

export type CacheEntry<T = unknown> = {
    scopeKey: string;
    scope: CacheScope;
    data: T;
    createdAt: number;
    expiresAt?: number;
    updatedAt: number;
};

export type Query = {
    key: string;
    entries: Map<string, CacheEntry>;
};

export type DeleteRowParams = {
    key: string;
    id: string | number;
    nameID: string;
    subProp?: string;
};

export type PushRow = {
    key: string;
    data: unknown;
    subProp?: string;
};

export type UpdateRowType = {
    key: string;
    id: string | number;
    nameID: string;
    newData: unknown;
    subProp?: string;
};

export type GetDataType<T = unknown, TFilters extends Filters = Filters> = {
    key: string;
    page?: number;
    pageSize?: number;
    filters?: TFilters;
    endpoint: string;
    cache?: CacheOptions;
    forceRefresh?: boolean;
    enabled?: boolean;
    fetchFunction: (endpoint: string, ...args: unknown[]) => Promise<T>;
    minDataFetch?: number;
    queryClient?: QueryClient;
};

export type FilterUpdater<TFilters extends Filters> =
    | Partial<TFilters>
    | ((currentFilters: TFilters) => Partial<TFilters>);

export type FilterActionOptions = {
    refetch?: boolean;
};

export type Pagination = {
    page?: number;
    pageSize?: number;
};

export type PaginationUpdater =
    | Pagination
    | ((currentPagination: Required<Pagination>) => Pagination);
