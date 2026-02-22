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
  enabled = false,
  endpoint,
}: PropsHook) => {
  const { getURL, getValue } = useUrl();
  
  const status = !!getValue('status')

  const url = useMemo(() => getURL(endpoint), [getURL, endpoint]);
  const fetchEnabled = enabled || status;
  const { data, isLoading, refetch } = useGetQuery<T[]>(
    url,
    queryKey ?? url,
    fetchEnabled
  );

  return {
    data: data ?? [],
    isLoading,
    get: refetch
  };
};
