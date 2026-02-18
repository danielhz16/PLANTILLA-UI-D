import { MainForm } from "@/components/form/MainForm";
import type { Input } from "@/components/ts/form";
import { useDetails } from "./useDetails";
import Loader from "@/components/loading/Loader";
import { Title } from "@/components/layout/Title/Title";
import { Save } from "lucide-react";
import { MainCard } from "@/components/Cards/MainCard";
import { MainButton } from "@/components/buttons/MainButton";



interface Props {
    inputs: Input[];
    urlCreate: string;
    urlUpdate: string;
    keyCache: string;
    nameID: string;
    useDataForm?: boolean;
    subProp?: string;
}

export const Details: React.FC<Props> = ({ inputs, urlCreate, urlUpdate, keyCache, nameID, useDataForm = false, subProp }) => {

    const { ref, handleSubmit, savedForm, isPending } = useDetails({
        urlCreate,
        urlUpdate,
        keyCache,
        nameID,
        useDataForm,
        subProp
    });

    return (
        <MainCard sx={{ p: 2, height: '100%', borderRadius: '10px', paddingBlock: '1rem' }}>
            <Title title="Detalles">
                <MainButton onClick={savedForm} variant="contained" sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    Guardar {<Save size={18} />}
                </MainButton>
            </Title>
            <MainForm inputs={inputs} onSubmit={handleSubmit} ref={ref} />
            <Loader isPending={isPending} />
        </MainCard>
    )
}
