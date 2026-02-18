import { MainForm } from "../form/MainForm";
import { Title } from "../layout/Title/Title";
import { MainButton } from "../buttons/MainButton";
import { RefreshCcw } from "lucide-react";
import type { Input } from "../ts/form";
import { filterStatus } from "./inputs/filter-status";
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

export const MainFilter = ({ inputs = DEFAULT_INPUTS, get, title, initialValues, isPending = false }: Props) => {
    const { setValue } = useUrl()
    const inputsOnChamge = useMemo(() => {
        return inputs.map(i => ({
            ...i,
            handleChange: (value: any) => { 
                setValue(i.name, value)
            }
        }))
    }, [inputs, setValue])

    useEffect(() => {
        inputs.forEach(i => {
            if (i?.defaultValue !== undefined) {
                setValue(i.name, String(i.defaultValue));
            }
        });
    }, [inputs, setValue]);
    return (
        <Title title={title}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <MainForm inputs={inputsOnChamge} onSubmit={get} defaultValues={initialValues} />
                <MainButton variant="contained" onClick={get} sx={{ mt: 3 }} loading={isPending} >
                    <RefreshCcw size={18} />
                </MainButton>
            </Box>
        </Title>
    )
}