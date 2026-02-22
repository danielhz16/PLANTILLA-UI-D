import { MainForm } from "../form/MainForm";
import { Title } from "../layout/Title/Title";
import { MainButton } from "../buttons/MainButton";
import { RefreshCcw } from "lucide-react";
import type { Input } from "../ts/form";
import { defaultInitial, filterStatus } from "./inputs/filter-status";
import { useUrl } from "@/hooks/api/useUrl";
import { useEffect, useMemo } from "react";
import { Box } from "@mui/material";

interface Props {
    inputs?: Input[];
    get: () => void;
    title: string;
    initialValues?: any,
    isPending?: boolean
}

const DEFAULT_INPUTS = filterStatus();

export const MainFilter = ({ inputs, get, title, initialValues, isPending = false }: Props) => {
    
    const { setValue } = useUrl()
    const inputsOnChamge = useMemo(() => {
        return (inputs || DEFAULT_INPUTS).map(i => ({
            ...i,
            handleChange: (value: any) => { 
                setValue(i.name, value)
            }
        }))
    }, [inputs, setValue])

    useEffect(() => {
        (initialValues || defaultInitial) && Object.entries(initialValues || defaultInitial).forEach(([key, value]) => {
            setValue(key, value as string)
        })
    }, [])

    return (
        <Title title={title}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <MainForm inputs={inputsOnChamge} onSubmit={get} defaultValues={!inputs ? defaultInitial : initialValues} />
                <MainButton variant="contained" onClick={get} sx={{ mt: 3 }} loading={isPending} >
                    <RefreshCcw size={18} />
                </MainButton>
            </Box>
        </Title>
    )
}