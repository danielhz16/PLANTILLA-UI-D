import React, { useRef } from 'react';
import { Modal } from '@/ui/modal/Modal';
import { MainForm } from '@/ui/form/MainForm';
import { MainButton } from '@/ui/buttons/MainButton';
import { Save, X } from 'lucide-react';
import { Box } from '@mui/material';
import type { Input } from '@/ui/ts/form';
import type { SxProps, Theme } from '@mui/material';
import Loader from '../loading/Loader';

export type RefForm = {
    save: () => void;
    getValues: () => any;
    getValue: (fieldName?: string) => any;
    setValue: any;
    reset: any;
    watch: any;
    trigger: any;
};

interface ModalFormProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    inputs: Input[];
    onSubmit: (data: any) => void;
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
    fullWidth?: boolean;
    isLoading?: boolean;
    defaultValues?: any;
    sx?: SxProps<Theme>;
    saveLabel?: string;
    cancelLabel?: string;
    columns?: number;
    isPending?: boolean;
}

export const ModalForm: React.FC<ModalFormProps> = ({
    open,
    onClose,
    title,
    inputs,
    onSubmit,
    maxWidth = 'sm',
    fullWidth = true,
    isLoading = false,
    defaultValues,
    sx,
    saveLabel = 'Guardar',
    cancelLabel = 'Cancelar',
    columns,
    isPending = false
}) => {
    const formRef = useRef<RefForm | null>(null);

    const handleSave = () => {
        formRef.current?.save();
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            title={title}
            maxWidth={maxWidth}
            fullWidth={fullWidth}
            sx={sx}
            actions={
                <Box sx={{ display: 'flex', gap: 1.5 }}>
                    <MainButton
                        variant="outlined"
                        onClick={onClose}
                        sx={{
                            gap: 1,
                            color: 'var(--color-error)',
                            borderColor: 'var(--color-error)',
                            '&:hover': {
                                borderColor: 'var(--color-error)',
                                backgroundColor: 'var(--color-errorBg)',
                            },
                        }}
                    >
                        <X size={16} /> {cancelLabel}
                    </MainButton>
                    <MainButton
                        variant="contained"
                        onClick={handleSave}
                        loading={isLoading}
                        sx={{
                            gap: 1,
                            background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                            color: 'var(--color-textOnPrimary) !important',
                            '&:hover': {
                                background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                            },
                        }}
                    >
                        <Save size={16} /> {saveLabel}
                    </MainButton>
                </Box>
            }
        >
            <Box sx={{ pt: 1 }}>
                <Loader isPending={isPending} />
                <MainForm
                    ref={formRef}
                    inputs={inputs}
                    onSubmit={onSubmit}
                    isLoading={isLoading}
                    defaultValues={defaultValues}
                    columns={columns}
                />
            </Box>
        </Modal>
    );
};

export default ModalForm;
