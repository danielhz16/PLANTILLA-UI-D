import { callApi } from "./base.api";
import { useQuery } from "@tanstack/react-query";

export const useGetQuery = <T = unknown>(
    url: string,
    key: string,
    run: boolean = true
) => {
    const query = useQuery<T>({
        queryKey: [key, url],
        queryFn: () => callApi<T>(url, "GET"),
        enabled: run,
    });

    return {
        data: query.data,
        isLoading: query.isLoading || query.isFetching,
        error: query.error,
        refetch: query.refetch,
    };
};
