import { callApi } from "./base.api";
import { useQuery } from "@tanstack/react-query";


type Config = {
    pagination?: boolean,
    desc?: boolean,
    columnOrder?: string | null;
}

export const useGetQuery = <T = unknown>(
    url: string,
    key: string,
    run: boolean = true,
    config: Config = {
        pagination: false,
        desc: false,
        columnOrder: null
    }
) => {
    const query = useQuery<T>({
        queryKey: [key],
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
