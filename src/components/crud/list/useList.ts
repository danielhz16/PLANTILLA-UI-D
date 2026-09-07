import { useListQuery } from "./useListQuery";
import { useUrl } from "@/hooks/api/useUrl";
import { callApi } from "@/hooks/api/base.api";
import { constructUrlFilter } from "@/lib/smart-query-ui/src/helpers/constructUrlFilter";
import { createSmartQueryKey } from "@/lib/smart-query-ui/src/query/queryCache";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";

const DEFAULT_PAGE_SIZE = 10;
const PAGE_FETCH_WINDOW = 3;

export interface PropsHook {
  queryKey?: string;
  endpoint: string;
  enabled?: boolean;
  minDataFetch?: number;
}

export const useList = <T,>({
  queryKey,
  enabled = false,
  endpoint,
  minDataFetch,
}: PropsHook) => {
  const { getURL, getValue } = useUrl();
  const status = !!getValue('status_id')
  const queryClient = useQueryClient();

  const [tablePage, setTablePageState] = useState(1);
  const [tablePageSize, setTablePageSizeState] = useState(DEFAULT_PAGE_SIZE);
  const [previousPagedData, setPreviousPagedData] = useState<T[]>([]);
  const [showBlurPreview, setShowBlurPreview] = useState(false);

  const url = useMemo(() => getURL(endpoint), [getURL, endpoint]);
  const fetchEnabled = enabled || status;
  const queryPage = Math.floor((tablePage - 1) / PAGE_FETCH_WINDOW) + 1;
  const queryPageSize = tablePageSize * PAGE_FETCH_WINDOW;
  const pageInCurrentBlock = ((tablePage - 1) % PAGE_FETCH_WINDOW) + 1;
  const cacheKey = queryKey ?? url;
  const {
    data,
    isLoading,
    isFetched,
    isFetching,
    fetchSource,
    refetch,
    columnFilters,
    onColumnFilterChange,
    onColumnFilterBlur,
    filters,
    addFilter,
    removeFilter,
    clearFilters,
    totalRecords
  } = useListQuery<T[]>({
    url,
    key: cacheKey,
    run: fetchEnabled,
    minDataFetch,
    page: queryPage,
    pageSize: queryPageSize
  });

  const rawData = (data) as T[];
  const isFullDatasetResolved = rawData.length > queryPageSize;
  const pageOffset = isFullDatasetResolved
    ? (tablePage - 1) * tablePageSize
    : ((tablePage - 1) % PAGE_FETCH_WINDOW) * tablePageSize;
  const pagedData = rawData.slice(pageOffset, pageOffset + tablePageSize);
  const isColumnChangeFetching = isFetching && fetchSource === "column-change";
  const isColumnBlurFetching = isFetching && fetchSource === "column-blur";
  const isColumnFilterFetching = isColumnChangeFetching || isColumnBlurFetching;
  const shouldUsePreviousPageData = pagedData.length === 0
    && (isColumnChangeFetching || (isColumnBlurFetching && !showBlurPreview));
  const resolvedPagedData = shouldUsePreviousPageData ? previousPagedData : pagedData;
  const shouldShowPreview = isColumnBlurFetching
    ? showBlurPreview
    : isLoading;

  const totalPages = totalRecords > 0 ? Math.ceil(totalRecords / tablePageSize) : 0;
  const hasNextPage = totalPages > 0 ? tablePage < totalPages : (rawData.length > pageOffset + tablePageSize || rawData.length === queryPageSize);

  useEffect(() => {
    const shouldLoadNextBlock = fetchEnabled
      && rawData.length === queryPageSize
      && pageInCurrentBlock >= PAGE_FETCH_WINDOW - 1;

    if (!shouldLoadNextBlock) {
      return;
    }

    const nextQueryPage = queryPage + 1;
    const nextScope = {
      endpoint: url,
      page: nextQueryPage,
      pageSize: queryPageSize,
      filters
    };

    void queryClient.prefetchQuery({
      queryKey: createSmartQueryKey(cacheKey, nextScope),
      queryFn: () => callApi<T[]>(
        constructUrlFilter(url, filters, nextQueryPage, queryPageSize),
        "GET"
      ),
      staleTime: 5 * 60 * 1000
    });
  }, [
    cacheKey,
    fetchEnabled,
    filters,
    pageInCurrentBlock,
    queryClient,
    queryPage,
    queryPageSize,
    rawData.length,
    url
  ]);

  const setTablePage = useCallback((nextPage: number) => {
    setTablePageState(Math.max(1, nextPage));
  }, []);

  const setTablePageSize = useCallback((nextPageSize: number) => {
    setTablePageSizeState(nextPageSize);
    setTablePageState(1);
  }, []);

  const handleColumnFilterChange = useCallback((name: string, value: string) => {
    if (pagedData.length > 0 && !isColumnFilterFetching) {
      setPreviousPagedData(pagedData);
    }

    setTablePageState(1);
    onColumnFilterChange(name, value);
  }, [isColumnFilterFetching, onColumnFilterChange, pagedData]);

  const handleColumnFilterBlur = useCallback((name: string, value: string) => {
    setShowBlurPreview(pagedData.length === 0);

    if (pagedData.length > 0 && !isColumnFilterFetching) {
      setPreviousPagedData(pagedData);
    }

    setTablePageState(1);
    onColumnFilterBlur(name, value);
  }, [isColumnFilterFetching, onColumnFilterBlur, pagedData]);

    return {
    data: resolvedPagedData,
    rawData: data,
    isLoading: shouldShowPreview,
    isFetched,
    get: refetch,
    columnFilters,
    onColumnFilterChange: handleColumnFilterChange,
    onColumnFilterBlur: handleColumnFilterBlur,
    filters,
    addFilter,
    removeFilter,
    clearFilters,
    page: tablePage,
    pageSize: tablePageSize,
    hasNextPage,
    setPage: setTablePage,
    setPageSize: setTablePageSize,
    totalPages,
    totalRecords
  };
};
