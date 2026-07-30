import { useAuth, TYPES_AUTHORIZATIONS } from "@/features/auth";
import { MainForm } from "@/ui/form/MainForm";
import type { Input } from "@/ui/ts/form";
import { useDetails, type PropsHook } from "./useDetails";
import Loader from "@/ui/loading/Loader";
import { Title } from "@/ui/layout/Title/Title";
import { ArrowLeft, Save } from "lucide-react";
import { MainCard } from "@/ui/Cards/MainCard";
import { MainButton } from "@/ui/buttons/MainButton";
import { Box, Skeleton } from "@mui/material";



export interface Props extends PropsHook {
    inputs: Input[];
    title: string,
    inyectData?: {},
    permission?: string;
    enabledEdit?: boolean;
    isLoading?: boolean
}

export const Details: React.FC<Props> = ({ inputs, urlCreate, urlUpdate, keyCache, nameID, useDataForm = false, subProp, title, ReadEndpoint, inyectData, permission, enabledEdit, isLoading }) => {
    const { validarPermiso } = useAuth();
    const canEdit = enabledEdit ?? (permission ? validarPermiso(permission, TYPES_AUTHORIZATIONS.Write) : true);

    const { ref, handleSubmit, savedForm, isPending, id, isLoading: isFetching, data, back } = useDetails({
        urlCreate,
        urlUpdate,
        keyCache,
        nameID,
        useDataForm,
        subProp,
        ReadEndpoint
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
                    <MainButton
                        onClick={savedForm}
                        variant="contained"
                        sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}
                        color="primary"
                        disabled={!canEdit || isPending}
                    >
                        <Save size={18} /> Guardar
                    </MainButton>
                </Box>
            </Title>
            {isLoading ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Skeleton key={i} variant="rectangular" height={48} sx={{ borderRadius: 1, width: '100%' }} />
                    ))}
                </Box>
            ) : (
                <MainForm
                    inputs={inputs}
                    onSubmit={handleSubmit}
                    ref={ref}
                    isLoading={isFetching}
                    disabled={!canEdit}
                    defaultValues={{
                        ...data ?? {} as Object, ...inyectData 
                    }}
                />
            )}
            <Loader isPending={isPending} />
        </MainCard>
    )
}
