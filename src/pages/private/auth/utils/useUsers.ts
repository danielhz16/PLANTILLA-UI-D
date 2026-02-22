import { useGetQuery } from "@/hooks/api/useGetQuery";

export const useUsers = () => {
    const { data: optionsCompany, isLoading } = useGetQuery('/companies/', 'users')

    return {
        optionsCompany,
        isLoading
    }
}