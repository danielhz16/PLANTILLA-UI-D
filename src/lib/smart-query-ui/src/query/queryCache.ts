import type { QueryClient } from "@tanstack/react-query";
import type { CacheOptions, CacheScope, DeleteRowParams, PushRow, UpdateRowType } from "../types";

const normalizeValue = (value: unknown): unknown => {
    if (Array.isArray(value)) {
        return value
            .filter((item) => item !== null && item !== undefined)
            .map((item) => normalizeValue(item));
    }

    if (value && typeof value === "object") {
        return Object.keys(value as Record<string, unknown>)
            .sort()
            .reduce<Record<string, unknown>>((accumulator, currentKey) => {
                const normalizedValue = normalizeValue((value as Record<string, unknown>)[currentKey]);

                if (normalizedValue === undefined) {
                    return accumulator;
                }

                accumulator[currentKey] = normalizedValue;
                return accumulator;
            }, {});
    }

    if (value === null || value === undefined) {
        return undefined;
    }

    return value;
};

export const normalizeScope = (scope: CacheScope): CacheScope => ({
    endpoint: scope.endpoint,
    page: scope.page,
    pageSize: scope.pageSize,
    filters: normalizeValue(scope.filters ?? {}) as CacheScope["filters"]
});

export const createSmartQueryKey = (key: string, scope?: CacheScope) => {
    return scope ? [key, normalizeScope(scope)] as const : [key] as const;
};

export const savedCache = <T>(
    queryClient: QueryClient,
    key: string,
    scope: CacheScope,
    data: T,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- kept for CacheOptions API compatibility
    options?: CacheOptions
): T => {
    queryClient.setQueryData(createSmartQueryKey(key, scope), data);
    return data;
};

export const validateUseFilters = (
    queryClient: QueryClient,
    key: string,
    scope: CacheScope
): boolean => {
    return queryClient.getQueryData(createSmartQueryKey(key, scope)) !== undefined;
};

export const getCache = <T = unknown>(
    queryClient: QueryClient,
    key: string,
    scope?: CacheScope
): T | null => {
    if (scope) {
        return queryClient.getQueryData<T>(createSmartQueryKey(key, scope)) ?? null;
    }

    const entries = queryClient.getQueryCache().findAll({ queryKey: createSmartQueryKey(key) });
    const latestEntry = entries.sort((current, next) => next.state.dataUpdatedAt - current.state.dataUpdatedAt)[0];

    return (latestEntry?.state.data as T | undefined) ?? null;
};

export const clearCache = (
    queryClient: QueryClient,
    key?: string,
    scope?: CacheScope
): void => {
    if (!key) {
        queryClient.clear();
        return;
    }

    if (!scope) {
        queryClient.removeQueries({ queryKey: createSmartQueryKey(key) });
        return;
    }

    queryClient.removeQueries({ queryKey: createSmartQueryKey(key, scope), exact: true });
};

const updateCachedRows = (
    data: unknown,
    updater: (rows: Record<string, unknown>[]) => Record<string, unknown>[],
    subProp?: string
) => {
    if (!data || typeof data !== "object") {
        return data;
    }

    const objectData = data as Record<string, unknown>;
    const rowsKey = subProp ?? "data";
    const rows = objectData[rowsKey];

    if (!Array.isArray(rows)) {
        return data;
    }

    return {
        ...objectData,
        [rowsKey]: updater(rows as Record<string, unknown>[])
    };
};

const mutateArrayEntries = (
    queryClient: QueryClient,
    key: string,
    updater: (rows: Record<string, unknown>[]) => Record<string, unknown>[],
    subProp?: string
): void => {
    queryClient.setQueriesData(
        { queryKey: createSmartQueryKey(key) },
        (data) => updateCachedRows(data, updater, subProp)
    );
};

const isSameId = (currentId: unknown, targetId: string | number): boolean => {
    if (typeof currentId !== "string" && typeof currentId !== "number" && typeof currentId !== "boolean") {
        return false;
    }

    return String(currentId) === String(targetId);
};

export const deleteRow = ({
    queryClient,
    key,
    id,
    nameID,
    subProp
}: DeleteRowParams & { queryClient: QueryClient }) => {
    mutateArrayEntries(queryClient, key, (rows) =>
        rows.filter((item) => {
            return !isSameId(item[nameID], id);
        })
    , subProp);
};

export const pushRow = ({
    queryClient,
    key,
    data,
    subProp
}: PushRow & { queryClient: QueryClient }) => {
    mutateArrayEntries(queryClient, key, (rows) => [...rows, data as Record<string, unknown>], subProp);
};

export const updateRow = ({
    queryClient,
    key,
    id,
    nameID,
    newData,
    subProp
}: UpdateRowType & { queryClient: QueryClient }) => {
    mutateArrayEntries(queryClient, key, (rows) =>
        rows.map((item) => {
            if (!isSameId(item[nameID], id)) {
                return item;
            }

            return {
                ...item,
                ...(newData as Record<string, unknown>)
            };
        })
    , subProp);
};
