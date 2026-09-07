import { useQueryClient } from "@tanstack/react-query";
import { useGetData } from "./src/hooks/useGetData";
import { filterListData } from "./src/hooks/useSmartList";
import { clearCache, getCache, deleteRow, pushRow, savedCache, updateRow } from "./src/query/queryCache";
import { getData } from "./src/query/index";
import type { CacheOptions, CacheScope, DeleteRowParams, GetDataType, PushRow, UpdateRowType } from "./src/types";

export const useSmartQuery = () => {
    const queryClient = useQueryClient();

    return {
        clearCache: (key?: string, scope?: CacheScope) => clearCache(queryClient, key, scope),
        getCache: <T = unknown>(key: string, scope?: CacheScope) => getCache<T>(queryClient, key, scope),
        deleteRow: (params: DeleteRowParams) => deleteRow({ queryClient, ...params }),
        pushRow: (params: PushRow) => pushRow({ queryClient, ...params }),
        savedCache: <T,>(
            key: string,
            scope: CacheScope,
            data: T,
            options?: CacheOptions
        ) => savedCache(queryClient, key, scope, data, options),
        updateRow: (params: UpdateRowType) => updateRow({ queryClient, ...params }),
        getData: <T,>(params: GetDataType<T>) => getData<T>({ ...params, queryClient }),
        useGetData,
        filterListData
    };
};

export { useGetData, filterListData, getData, clearCache, getCache, deleteRow, pushRow, savedCache, updateRow };
export type * from "./src/types";
