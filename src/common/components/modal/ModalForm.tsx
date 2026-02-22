import React, { useRef } from 'react';
import { Modal } from '@/components/modal/Modal';
import { MainForm } from '@/components/form/MainForm';
import { MainButton } from '@/components/buttons/MainButton';
import { Save, X } from 'lucide-react';
import { Box } from '@mui/material';
import type { Input } from '@/components/ts/form';
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
                            color: '#ef4444',
                            borderColor: 'rgba(239, 68, 68, 0.5)',
                            '&:hover': {
                                borderColor: '#ef4444',
                                backgroundColor: 'rgba(239, 68, 68, 0.08)',
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
                            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                            color: '#fff !important',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
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
