import { MainForm } from "@/components/form/MainForm";
import type { Input } from "@/components/ts/form";
import { useDetails, type PropsHook } from "./useDetails";
import Loader from "@/components/loading/Loader";
import { Title } from "@/components/layout/Title/Title";
import { ArrowLeft, Save } from "lucide-react";
import { MainCard } from "@/components/Cards/MainCard";
import { MainButton } from "@/components/buttons/MainButton";
import { Box } from "@mui/material";



export interface Props extends PropsHook {
    inputs: Input[];
    title: string,
    inyectData?: {},
    enabledEdit?: boolean
}

export const Details: React.FC<Props> = ({ inputs, urlCreate, urlUpdate, keyCache, nameID, useDataForm = false, subProp, title, readEndpoint, inyectData, enabledEdit = true }) => {

    const { ref, handleSubmit, savedForm, isPending, id, isLoading, data, back } = useDetails({
        urlCreate,
        urlUpdate,
        keyCache,
        nameID,
        useDataForm,
        subProp,
        readEndpoint
    });

    return (
        <MainCard sx={{ p: 2, height: '100%', borderRadius: '10px', paddingBlock: '1rem' }}>
            <Title title={`${id ? 'Editar' : 'Crear'} ${title}`}>
                <Box sx={{
                    display: 'flex',
                    gap: 1
                }} >
                    <MainButton onClick={back} variant="contained" color="warning" sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }} disabled={isPending} >
                        <ArrowLeft size={18} /> Volver
                    </MainButton>
                    <MainButton onClick={savedForm} variant="contained" sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }} color="primary">
                        {enabledEdit && (
                            <>
                                <Save size={18} /> Guardar
                            </>
                        )}
                    </MainButton>
                </Box>
            </Title>
            <MainForm inputs={inputs} onSubmit={handleSubmit} ref={ref} isLoading={isLoading} disabled={enabledEdit}
                defaultValues={{
                    ...data ?? {} as Object, ...inyectData ?? {}
                }} />
            <Loader isPending={isPending} />
        </MainCard>
    )
}
