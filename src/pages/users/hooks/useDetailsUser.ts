import { useMemo } from "react";
import { inputsUser } from "../details/inputs";
import { useGetQuery } from "@/hooks";
import { type Options } from "@/shared";

export const useDetailsUser = () => {
    const { data: roles, isLoading: isLoadingRoles } = useGetQuery<Options[]>("/roles/list?isOptions=true", "roles-options", true);
    const inputs = useMemo(() => {
        return inputsUser({ roles: roles ?? [] });
    }, [roles])

    return {
        inputs,
        isLoadingRoles,
    };
}