import { useMutation } from "@tanstack/react-query";
import { callApi } from "./base.api";
import type { Method } from "@/const/api";
import { useClient } from "./useClient";

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
  const { pushItem, updateItem, deleteItem } = useClient();
 
   

  const mutation = useMutation<Response<T>, Error, any>({
    mutationFn: (data) =>
      callApi<Response<T>>(url, method, data ?? {}, useDataForm),

    onSuccess: (res) => {
      if (!keyCache) return;

      if (res?.newData) {
        pushItem({ key: keyCache, newData: res.newData, subProp });
      }

      if (res?.updateData && nameID) {
        updateItem({
          key: keyCache,
          id: (res?.updateData as any)[nameID],
          nameID,
          newData: res.updateData,
          subProp,
        });
      }

  
      if (deleteCell && id && nameID) {
        deleteItem({
          key: keyCache,
          id: String(id),
          nameID,
          subProp,
        });
      }
    },
  });

  return mutation;
};
