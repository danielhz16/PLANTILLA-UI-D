import { useMutationQuery } from "@/hooks/api/useMutationQuery";
import { useParams } from "react-router";
import { useRef } from "react";

export const useDetails = ({
    urlCreate,
    urlUpdate,
    keyCache,
    nameID,
    useDataForm = false,
    subProp,
    interceptSubmit,
}: {
    urlCreate: string;
    urlUpdate: string;
    keyCache: string;
    nameID: string;
    useDataForm?: boolean;
    subProp?: string;
    interceptSubmit?: (data: any) => void;
}) => {
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
    const url = id ? urlUpdate : urlCreate;



    const mutate = useMutationQuery({
        url,
        method,
        keyCache: keyCache,
        nameID: nameID,
        subProp: subProp,
        useDataForm: useDataForm,
    });



    const handleSubmit = async (data: any) => {
        if (interceptSubmit) {
            data = interceptSubmit(data);
        }
        console.log(data)
        await mutate.mutateAsync(data);
    }

    const savedForm = () => {
        ref?.current?.save();
    }

    return { id, savedForm, ref, handleSubmit, isPending: mutate.isPending };
}