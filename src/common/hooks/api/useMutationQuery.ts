import { useMutation } from "@tanstack/react-query";
import { callApi } from "./base.api";
import type { Method } from "@/const/api";
import { useSmartQuery } from "@/common/lib/smart-query-ui";

interface Props {
  url: string;
  keyCache?: string;
  method: Method;
  nameID?: string;
  subProp?: string;
  useDataForm?: boolean;
  deleteCell?: boolean;
  id?: string | number
}

interface Response<T> {
  newData?: T;
  updateData?: T;
  deleteData?: T;
}

type MutationVariables = Record<string, unknown> | FormData | null | undefined;
type RowData = Record<string, unknown>;

export const useMutationQuery = <T>({
  url,
  keyCache,
  method,
  nameID,
  subProp,
  useDataForm = false,
  deleteCell = false,
  id
}: Props) => {
  const { pushRow, updateRow, deleteRow } = useSmartQuery();

  const mutation = useMutation<Response<T>, Error, MutationVariables>({
    mutationFn: (data) =>
      callApi<Response<T>>(url, method, data ?? {}, useDataForm),

    onSuccess: (res) => {
      if (!keyCache) return;

      if (res?.newData) {
        pushRow({ key: keyCache, data: res.newData, subProp });
      }

      if (res?.updateData && nameID) {
        const updateData = res.updateData as RowData;

        updateRow({
          key: keyCache,
          id: updateData[nameID] as string | number,
          nameID,
          newData: res.updateData,
          subProp,
        });
      }

      if (deleteCell && id && nameID) {
        deleteRow({
          key: keyCache,
          id,
          nameID,
          subProp,
        });
      }
    },
  });

  return mutation;
};
