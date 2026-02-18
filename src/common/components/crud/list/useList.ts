import { useGetQuery } from "@/hooks/api/useGetQuery";
import { useUrl } from "@/hooks/api/useUrl";
import { useMemo } from "react";

export interface PropsHook {
  queryKey?: string;
  endpoint: string;
  enabled?: boolean;
}

export const useList = <T,>({
  queryKey,
  enabled = true,
  endpoint,
}: PropsHook) => {
  const { getURL } = useUrl();

  const url = useMemo(() => getURL(endpoint), [getURL, endpoint]);

  const { data, isLoading, refetch } = useGetQuery<T[]>(
    url,
    queryKey ?? url,
    enabled
  );

  return {
    data: data ?? [],
    isLoading,
    get: refetch
  };
};
