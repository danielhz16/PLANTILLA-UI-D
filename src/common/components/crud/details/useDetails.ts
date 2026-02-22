import { useMutationQuery } from "@/hooks/api/useMutationQuery";
import { useParams } from "react-router";
import { useRef } from "react";
import { useNavigate } from "react-router";
import { useGetQuery } from "@/hooks/api/useGetQuery";
import { useClient } from "@/hooks/api/useClient";
export interface PropsHook {
    urlCreate: string;
    urlUpdate: string;
    keyCache: string;
    nameID?: string;
    useDataForm?: boolean;
    subProp?: string;
    interceptSubmit?: (data: any) => void;
    readEndpoint: string
}

export const useDetails = ({
    urlCreate,
    urlUpdate,
    keyCache,
    nameID = 'id',
    useDataForm = false,
    subProp,
    interceptSubmit,
    readEndpoint
}: PropsHook) => {
    const nav = useNavigate();
    const { id } = useParams();
    const ref = useRef<{
        save: () => void;
        getValues: () => any;
        getValue: (fieldName?: string) => any;
        setValue: any;
        reset: any;
        watch: any;
        trigger: any;
    }>(null);
    const method = id ? "PUT" : "POST";
    const url = id ? `${urlUpdate}/${id}`  : urlCreate;

    const urlData = id && `${readEndpoint}/${id}` || '';

    const { data, isLoading } = useGetQuery(urlData, urlData, !!id)
    const { setData } = useClient();
     
    const mutate = useMutationQuery({
        url,
        method,
        keyCache: keyCache,
        nameID: nameID,
        subProp: subProp,
        useDataForm: useDataForm,
    });

    const back = () => nav(-1);

    const handleSubmit = async (data: any) => {
       
        if (interceptSubmit) {
            data = interceptSubmit(data);
        }
        await mutate.mutateAsync(data);
        setData(urlData, data)
        back();
    }

    const savedForm = () => {
        ref?.current?.save();
    }

    return { id, savedForm, ref, handleSubmit, isPending: mutate.isPending, isLoading, data, back };
}