import { useQueryClient } from '@tanstack/react-query'

export const useClient = () => {
    const queryClient = useQueryClient()

    const invalidateQuery = (queryKey: string) => {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
    }




    const updateItem = ({ key, id, nameID, newData, subProp }: { key: string, id: string, nameID: string, newData: any, subProp?: string }) => {
        queryClient.setQueryData([key], (oldData: Record<string, any> | any[]) => {
            if (!Array.isArray(oldData)) return oldData;
            const target = subProp ? (oldData as Record<string, any>)[subProp] : oldData;
            if (!Array.isArray(target)) return oldData;
            return oldData.map((item: Record<string, any>) => {
                return item[nameID] == id ? { ...item, ...newData } : item;
            });
        });
    };

    const deleteItem = ({ key, id, nameID, subProp }: { key: string, id: string, nameID: string, subProp?: string }) => {
        queryClient.setQueryData([key], (old: any) => {
            if (!old) return old;


            const target = subProp ? old[subProp] : old;

            if (!Array.isArray(target)) return old;


            const filtered = target.filter(item => item[nameID] != id);
            
            return subProp ? { ...old, [subProp]: filtered } : filtered;
        });
    };



    const pushItem = ({ key, newData, subProp }: { key: string, newData: any, subProp?: string }) => {


        queryClient.setQueryData([key], (oldData: any) => {
            const target = subProp ? oldData[subProp] : oldData;
            if (!Array.isArray(target)) return oldData;
            return subProp ? { ...oldData, [subProp]: [...target, newData] } : [...target, newData];
        });
    };

    const invalidateQueries = (keys: string[]) => {
        keys.forEach((key) => {
            queryClient.invalidateQueries({ queryKey: [key] });
        });
    }

    const getQueryData = (key: string) => {

        return queryClient.getQueryData([key]);
    }

    const getItem = ({ key, id, nameID }: { key: string, id: string, nameID: string }) => {
        const data: any[] = queryClient.getQueryData([key]) ?? [];
        return data.find(item => item[nameID] == id);
    };

    const updateListSubProp = ({ key, itme, id, nameID, newData }: { key: string, itme: string, id: string, nameID: string, newData: any }) => {
        queryClient.setQueryData([key], (oldData) => {
            if (!Array.isArray(oldData)) return oldData;
            return oldData.map((item) => {
                return item[nameID] === id ? { ...item, [itme]: newData } : item;
            });
        });
    };
    const pushItemSubProp = ({ key, item, newData }: { key: string, item: string, newData: any }) => {



        queryClient.setQueryData([key], (oldData) => {

            if (typeof oldData !== 'object' || oldData === null) {
                return oldData;
            }

            const subProp: any[] = Array.isArray((oldData as Record<string, any>)[item]) ? (oldData as Record<string, any>)[item] : [];

            const updatedData = {
                ...oldData,
                [item]: [...subProp, newData],
            };


            return updatedData;
        });
    };

    const setData = (key: string, newData: {}) => {
        queryClient.setQueryData([key], newData);
    }

    const invalidateAll = () => {
        queryClient.invalidateQueries()
    }
    return {
        invalidateQuery, updateItem, deleteItem, invalidateAll, setData,
        pushItem, invalidateQueries, getQueryData, getItem, updateListSubProp, pushItemSubProp
    };

}