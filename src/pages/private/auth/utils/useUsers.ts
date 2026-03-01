import { useGetQuery } from "@/hooks/api/useGetQuery";
import { defaultInitial, type Options, CACHE_KEY } from "@/common";
import { useMemo } from "react";

export const useUsers = () => {
    const { data: optionsCompany, isLoading } = useGetQuery<Options[]>('/company/companies-options', CACHE_KEY.COMPANY_OPTIONS);

    const initialValues = useMemo(() => ({
        ...defaultInitial,
        company: optionsCompany && optionsCompany[0]?.id 
    }), [optionsCompany]);

    return {
        optionsCompany,
        isLoading,
        initialValues
    }
}