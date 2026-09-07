import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { constructUrlFilter } from "../helpers/constructUrlFilter";
import { createSmartQueryKey, normalizeScope } from "../query/queryCache";
import type { CacheScope, FilterActionOptions, Filters, FilterUpdater, GetDataType, PaginationUpdater } from "../types";
import { filterListData } from "./useSmartList";

const DEFAULT_STALE_TIME = 5 * 60 * 1000;
const COLUMN_FILTER_FETCH_DELAY = 700;
type FetchSource = "manual" | "column-change" | "column-blur" | null;

export type UseGetDataResult<T, TFilters extends Filters> = {
  data: T | null;
  isLoading: boolean;
  isFetched: boolean;
  isFetching: boolean;
  fetchSource: FetchSource;
  error: unknown;
  refetch: () => Promise<void>;
  columnFilters: Record<string, string>;
  onColumnFilterChange: (name: string, value: string) => void;
  onColumnFilterBlur: (name: string, value: string) => void;
  filters: TFilters;
  page: number;
  pageSize: number;
  setFilters: (nextFilters: FilterUpdater<TFilters>, options?: FilterActionOptions) => void;
  addFilter: <K extends keyof TFilters>(name: K, value: TFilters[K], options?: FilterActionOptions) => void;
  removeFilter: (name: keyof TFilters, options?: FilterActionOptions) => void;
  clearFilters: (options?: FilterActionOptions) => void;
  setPage: (nextPage: number | ((currentPage: number) => number), options?: FilterActionOptions) => void;
  setPageSize: (nextPageSize: number | ((currentPageSize: number) => number), options?: FilterActionOptions) => void;
  setPagination: (nextPagination: PaginationUpdater, options?: FilterActionOptions) => void;
  totalRecords: number;
};

const hasValidMinDataFetch = (minDataFetch?: number): minDataFetch is number => {
  return typeof minDataFetch === "number" && minDataFetch > 0;
};

const shouldRefetchOnColumnFilterChange = <T,>(
  data: T | null,
  nextColumnFilters: Record<string, string>,
  minDataFetch?: number
): boolean => {
  if (!hasValidMinDataFetch(minDataFetch)) {
    return false;
  }

  const responseData = (data as { data?: unknown[] } | null)?.data;
  if (!Array.isArray(responseData)) {
    return false;
  }

  return filterListData(responseData, nextColumnFilters).length < minDataFetch;
};

const hasSameScope = (currentScope: CacheScope, cachedScope: CacheScope): boolean => {
  const normalizedCurrentScope = normalizeScope(currentScope);
  const normalizedCachedScope = normalizeScope(cachedScope);

  return normalizedCachedScope.endpoint === normalizedCurrentScope.endpoint
    && normalizedCachedScope.pageSize === normalizedCurrentScope.pageSize
    && JSON.stringify(normalizedCachedScope.filters ?? {}) === JSON.stringify(normalizedCurrentScope.filters ?? {});
};

export const useGetData = <T, TFilters extends Filters = Filters,>({
  key,
  page: controlledPage,
  pageSize: controlledPageSize,
  filters: initialFilters,
  endpoint,
  fetchFunction,
  cache,
  forceRefresh = false,
  enabled = true,
  minDataFetch
}: GetDataType<T, TFilters>): UseGetDataResult<T, TFilters> => {
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState<TFilters>((initialFilters ?? {}) as TFilters);
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});
  const [pagination, setPagination] = useState({
    page: controlledPage ?? 1,
    pageSize: controlledPageSize ?? 10
  });
  const page = controlledPage ?? pagination.page;
  const pageSize = controlledPageSize ?? pagination.pageSize;
  const [autoFetchEnabled, setAutoFetchEnabled] = useState(true);
  const [columnFetchEnabled, setColumnFetchEnabled] = useState(false);
  const [fetchSource, setFetchSource] = useState<FetchSource>(null);
  const columnFilterTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scope = useMemo(() => ({
    endpoint,
    page,
    pageSize,
    filters
  }), [endpoint, filters, page, pageSize]);

  const queryKey = useMemo(() => createSmartQueryKey(key, scope), [key, scope]);

  const endpointWithFilters = useMemo(
    () => constructUrlFilter(endpoint, filters, page, pageSize),
    [endpoint, filters, page, pageSize]
  );

  const query = useQuery<T>({
    queryKey,
    queryFn: () => fetchFunction(endpointWithFilters),
    enabled: (enabled || columnFetchEnabled) && autoFetchEnabled,
    staleTime: forceRefresh || cache?.enabled === false
      ? 0
      : cache?.ttl ?? DEFAULT_STALE_TIME,
    gcTime: cache?.enabled === false ? 0 : undefined,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false
  });

  const cachedDataset = useMemo(() => {
    const cachedQueries = queryClient.getQueryCache().findAll({ queryKey: createSmartQueryKey(key) });
    const currentScope = { endpoint, pageSize, filters };
    const cachedPages = cachedQueries
      .map((cachedQuery) => {
        const cachedQueryKey = cachedQuery.queryKey as Readonly<[string, CacheScope?]>;
        const cachedScope = cachedQueryKey[1];

        if (!cachedScope || !hasSameScope(currentScope, cachedScope)) {
          return null;
        }

        const cachedData = cachedQuery.state.data as { info?: { count?: number }; data?: unknown[] } | null;
        const rows = Array.isArray(cachedData?.data) ? cachedData.data : [];
        const total = cachedData?.info?.count ?? 0;
        return {
          page: cachedScope.page ?? 1,
          rows,
          total
        };
      })
      .filter((cachedPage): cachedPage is { page: number; rows: unknown[]; total: number } => cachedPage !== null)
      .sort((currentPage, nextPage) => currentPage.page - nextPage.page);

    const rows = cachedPages.flatMap((cachedPage) => cachedPage.rows);
    const totalRecords = cachedPages.reduce((currentTotal, cachedPage) => {
      return Math.max(currentTotal, cachedPage.total);
    }, 0);

    return {
      rows,
      totalRecords,
      isFullDatasetLoaded: totalRecords > 0 && rows.length >= totalRecords
    };
  }, [endpoint, filters, key, pageSize, query.data, queryClient]);

  const clearColumnFilterTimeout = useCallback(() => {
    if (!columnFilterTimeoutRef.current) {
      return;
    }

    clearTimeout(columnFilterTimeoutRef.current);
    columnFilterTimeoutRef.current = null;
  }, []);

  useEffect(() => {
    return () => {
      clearColumnFilterTimeout();
    };
  }, [clearColumnFilterTimeout]);

  const fetchData = useCallback(async () => {
    setAutoFetchEnabled(true);
    setColumnFetchEnabled(true);
    setFetchSource("manual");
    await queryClient.invalidateQueries({ queryKey, exact: true });
    await query.refetch();
  }, [query, queryClient, queryKey]);

  const setFiltersWithOptions = useCallback(
    (nextFilters: FilterUpdater<TFilters>, options?: FilterActionOptions) => {
      setAutoFetchEnabled(options?.refetch !== false);
      setFilters((currentFilters) => {
        const resolvedFilters = typeof nextFilters === "function"
          ? nextFilters(currentFilters)
          : nextFilters;

        const mergedFilters = { ...currentFilters, ...resolvedFilters } as TFilters;

        return mergedFilters;
      });
    },
    []
  );

  const addFilter = useCallback(
    <K extends keyof TFilters>(name: K, value: TFilters[K], options?: FilterActionOptions) => {
      setAutoFetchEnabled(options?.refetch !== false);
      setFilters((currentFilters) => {
        const nextFilters = {
          ...currentFilters,
          [name]: value
        } as TFilters;

        return nextFilters;
      });
    },
    []
  );

  const removeFilter = useCallback(
    (name: keyof TFilters, options?: FilterActionOptions) => {
      setAutoFetchEnabled(options?.refetch !== false);
      setFilters((currentFilters) => {
        const nextFilters = { ...currentFilters } as Partial<TFilters>;
        delete nextFilters[name];

        return nextFilters as TFilters;
      });
    },
    []
  );

  const clearFilters = useCallback(
    (options?: FilterActionOptions) => {
      const nextFilters = {} as TFilters;
      setAutoFetchEnabled(options?.refetch !== false);
      setColumnFetchEnabled(true);
      setFilters(nextFilters);
      setColumnFilters({});
      clearColumnFilterTimeout();

      if (options?.refetch !== false) {
        setFetchSource("manual");
        const nextScope = { endpoint, page, pageSize, filters: nextFilters };
        void queryClient.fetchQuery({
          queryKey: createSmartQueryKey(key, nextScope),
          queryFn: () => fetchFunction(constructUrlFilter(endpoint, nextFilters, page, pageSize)),
          staleTime: 0
        });
      }
    },
    [clearColumnFilterTimeout, endpoint, fetchFunction, key, page, pageSize, queryClient]
  );

  const commitColumnFilter = useCallback((name: string, value: string) => {
    const cleanValue = value.trim();
    const filterName = name as keyof TFilters;

    setAutoFetchEnabled(true);
    setColumnFetchEnabled(true);
    setFetchSource("column-change");
    setFilters((currentFilters) => {
      if (!cleanValue) {
        if (!(filterName in currentFilters)) {
          return currentFilters;
        }

        const nextFilters = { ...currentFilters } as Partial<TFilters>;
        delete nextFilters[filterName];
        return nextFilters as TFilters;
      }

      if (currentFilters[filterName] === cleanValue) {
        return currentFilters;
      }

      return {
        ...currentFilters,
        [filterName]: cleanValue
      } as TFilters;
    });
  }, []);

  const scheduleColumnFilterCommit = useCallback((name: string, value: string) => {
    clearColumnFilterTimeout();
    columnFilterTimeoutRef.current = setTimeout(() => {
      columnFilterTimeoutRef.current = null;
      commitColumnFilter(name, value);
    }, COLUMN_FILTER_FETCH_DELAY);
  }, [clearColumnFilterTimeout, commitColumnFilter]);

  const { resolvedData, totalRecords } = useMemo(() => {
    const rawResponse = query.data as { info?: { count?: number }; data?: unknown[] } | null | undefined;
    if (!rawResponse || !Array.isArray(rawResponse.data)) {
      return { resolvedData: [] as unknown as T, totalRecords: 0 };
    }

    const currentRows = rawResponse.data;
    const currentTotal = rawResponse.info?.count ?? 0;
    const sourceItems = cachedDataset.isFullDatasetLoaded
      ? cachedDataset.rows
      : currentRows;
    const total = cachedDataset.totalRecords || currentTotal;

    const filteredItems = filterListData(sourceItems, columnFilters);
    const hasActiveColumnFilters = Object.values(columnFilters).some((value) => value.trim() !== "");
    const hasLocalOnlyColumnFilters = Object.entries(columnFilters).some(([name, value]) => {
      const cleanValue = value.trim();

      if (!cleanValue) {
        return false;
      }

      return String(filters[name as keyof TFilters] ?? "").trim() !== cleanValue;
    });
    const totalRecords = cachedDataset.isFullDatasetLoaded || (hasActiveColumnFilters && filteredItems.length < total)
      ? filteredItems.length
      : total;

    return {
      resolvedData: filteredItems as T,
      totalRecords: hasLocalOnlyColumnFilters ? filteredItems.length : totalRecords
    };
  }, [cachedDataset, columnFilters, filters, query.data]);

  const handleColumnFilterChange = useCallback((name: string, value: string) => {
    const nextColumnFilters = {
      ...columnFilters,
      [name]: value
    };

    setColumnFilters(nextColumnFilters);

    if (cachedDataset.isFullDatasetLoaded) {
      clearColumnFilterTimeout();
      return;
    }

    if (shouldRefetchOnColumnFilterChange(query.data ?? null, nextColumnFilters, minDataFetch)) {
      scheduleColumnFilterCommit(name, value);
      return;
    }

    clearColumnFilterTimeout();
  }, [cachedDataset.isFullDatasetLoaded, clearColumnFilterTimeout, columnFilters, minDataFetch, query.data, scheduleColumnFilterCommit]);

  const handleColumnFilterBlur = useCallback((name: string, value: string) => {
    clearColumnFilterTimeout();

    const cleanValue = value.trim();
    const filterName = name as keyof TFilters;
    const nextColumnFilters = {
      ...columnFilters,
      [name]: value
    };

    setColumnFilters(nextColumnFilters);

    if (cachedDataset.isFullDatasetLoaded) {
      return;
    }

    const nextFilters = { ...filters } as Partial<TFilters>;

    if (cleanValue) {
      nextFilters[filterName] = cleanValue as TFilters[keyof TFilters];
    } else {
      delete nextFilters[filterName];
    }

    const resolvedFilters = nextFilters as TFilters;
    const nextScope = {
      endpoint,
      page,
      pageSize,
      filters: resolvedFilters
    };

    setAutoFetchEnabled(true);
    setColumnFetchEnabled(true);
    setFetchSource("column-blur");
    setFilters(resolvedFilters);

    void queryClient.fetchQuery({
      queryKey: createSmartQueryKey(key, nextScope),
      queryFn: () => fetchFunction(constructUrlFilter(endpoint, resolvedFilters, page, pageSize)),
      staleTime: 0
    });
  }, [cachedDataset.isFullDatasetLoaded, clearColumnFilterTimeout, columnFilters, endpoint, fetchFunction, filters, key, page, pageSize, queryClient]);

  const setPage = useCallback(
    (nextPage: number | ((currentPage: number) => number), options?: FilterActionOptions) => {
      setAutoFetchEnabled(options?.refetch !== false);
      setPagination((currentPagination) => {
        return {
          ...currentPagination,
          page: typeof nextPage === "function"
            ? nextPage(currentPagination.page)
            : nextPage
        };
      });
    },
    []
  );

  const setPageSize = useCallback(
    (nextPageSize: number | ((currentPageSize: number) => number), options?: FilterActionOptions) => {
      setAutoFetchEnabled(options?.refetch !== false);
      setPagination((currentPagination) => {
        return {
          ...currentPagination,
          pageSize: typeof nextPageSize === "function"
            ? nextPageSize(currentPagination.pageSize)
            : nextPageSize
        };
      });
    },
    []
  );

  const setPaginationState = useCallback(
    (nextPagination: PaginationUpdater, options?: FilterActionOptions) => {
      setAutoFetchEnabled(options?.refetch !== false);
      setPagination((currentPagination) => {
        const resolvedPagination = typeof nextPagination === "function"
          ? nextPagination(currentPagination)
          : nextPagination;

        return {
          page: resolvedPagination.page ?? currentPagination.page,
          pageSize: resolvedPagination.pageSize ?? currentPagination.pageSize
        };
      });
    },
    []
  );

    return {
    data: resolvedData,
    isLoading: fetchSource === "column-change"
      ? false
      : query.isLoading || query.isFetching,
    isFetched: query.isFetched,
    isFetching: query.isFetching,
    fetchSource: query.isFetching ? fetchSource : null,
    error: query.error,
    refetch: fetchData,
    columnFilters,
    onColumnFilterChange: handleColumnFilterChange,
    onColumnFilterBlur: handleColumnFilterBlur,
    filters,
    page,
    pageSize,
    setFilters: setFiltersWithOptions,
    addFilter,
    removeFilter,
    clearFilters,
    setPage,
    setPageSize,
    setPagination: setPaginationState,
    totalRecords
  };
};

export default useGetData;
