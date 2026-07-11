import { constructUrlFilter } from "../helpers/constructUrlFilter";
import { getCache, savedCache, validateUseFilters } from "./queryCache";
import type { GetDataType } from "../types";

export const getData = async <T,>({
    key,
    page = 1,
    pageSize = 10,
    filters,
    fetchFunction,
    endpoint,
    cache,
    forceRefresh = false,
    queryClient
}: GetDataType<T>): Promise<{ data: T | null; isLoading: boolean; onError: unknown }> => {
    let isLoading = true;
    let data: T | null = null;
    let onError: unknown = null;

    const scope = { endpoint, page, pageSize, filters };
    const endpointWithFilters = constructUrlFilter(endpoint, filters, page, pageSize);
    const isCacheEnabled = !!queryClient && cache?.enabled !== false;

    try {
        const canUseCache = isCacheEnabled && !forceRefresh && validateUseFilters(queryClient, key, scope);

        if (canUseCache) {
            data = getCache<T>(queryClient, key, scope);
        } else {
            const result = await fetchFunction(endpointWithFilters);
            data = isCacheEnabled
                ? savedCache<T>(queryClient, key, scope, result, cache)
                : result;
        }
    } catch (err: unknown) {
        onError = err;
    } finally {
        isLoading = false;
    }

    return { data, isLoading, onError };
};
