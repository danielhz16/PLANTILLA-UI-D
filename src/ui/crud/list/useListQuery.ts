import { useGetData } from "@/lib/smart-query-ui";
import { callApi } from "@/hooks/api/base.api";
import type { Filters } from "@/lib/smart-query-ui";
import { useCallback } from "react";

type UseGetQueryOptions = {
    minDataFetch?: number;
    page?: number;
    pageSize?: number;
};

type UseGetQueryProps<TFilters extends Filters> = UseGetQueryOptions & {
    url: string;
    key: string;
    run?: boolean;
    filters?: TFilters;
};

export const useListQuery = <T = unknown, TFilters extends Filters = Filters>({
    url,
    key,
    run = true,
    filters,
    minDataFetch,
    page,
    pageSize
}: UseGetQueryProps<TFilters>) => {
    const fetchFunction = useCallback((endpoint: string) => callApi<T>(endpoint, "GET"), []);

    const query = useGetData<T, TFilters>({
        key,
        endpoint: url,
        filters,
        enabled: run,
        page,
        pageSize,
        minDataFetch,
        fetchFunction,
    });

    return {
        data: query.data,
        isLoading: run ? query.isLoading : false,
        isFetched: run ? query.isFetched : false,
        isFetching: run ? query.isFetching : false,
        fetchSource: query.fetchSource,
        error: query.error,
        refetch: query.refetch,
        columnFilters: query.columnFilters,
        onColumnFilterChange: query.onColumnFilterChange,
        onColumnFilterBlur: query.onColumnFilterBlur,
        filters: query.filters,
        page: query.page,
        pageSize: query.pageSize,
        setFilters: query.setFilters,
        addFilter: query.addFilter,
        removeFilter: query.removeFilter,
        clearFilters: query.clearFilters,
        setPage: query.setPage,
        setPageSize: query.setPageSize,
        setPagination: query.setPagination,
        totalRecords: query.totalRecords,
    };
};
