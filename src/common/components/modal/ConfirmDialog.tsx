import React from 'react';
import { Modal } from './Modal';
import { Button, Box, Typography } from '@mui/material';
import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react';

export type ConfirmDialogType = 'warning' | 'error' | 'info' | 'success';

interface ConfirmDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    type?: ConfirmDialogType;
    confirmText?: string;
    cancelText?: string;
    confirmColor?: 'primary' | 'error' | 'warning' | 'success';
    isLoading?: boolean;
}

const typeConfig = {
    warning: {
        icon: AlertTriangle,
        color: 'var(--color-warning)',
        bgColor: 'rgba(245, 158, 11, 0.1)',
    },
    error: {
        icon: XCircle,
        color: 'var(--color-error)',
        bgColor: 'rgba(239, 68, 68, 0.1)',
    },
    info: {
        icon: Info,
        color: 'var(--color-primary)',
        bgColor: 'rgba(59, 130, 246, 0.1)',
    },
    success: {
        icon: CheckCircle,
        color: 'var(--color-success)',
        bgColor: 'rgba(16, 185, 129, 0.1)',
    },
};

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
    open,
    onClose,
    onConfirm,
    title,
    message,
    type = 'warning',
    confirmText = 'Confirmar',
    cancelText = 'Cancelar',
    confirmColor = 'primary',
    isLoading = false,
}) => {
    const config = typeConfig[type];
    const Icon = config.icon;

    const handleConfirm = () => {
        onConfirm();
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            title={title}
            maxWidth="sm"
            disableBackdropClick={isLoading}
            actions={
                <Box sx={{ display: 'flex', gap: 1.5, width: '100%' }}>
                    <Button
                        onClick={onClose}
                        disabled={isLoading}
                        variant="outlined"
                        sx={{
                            flex: 1,
                            borderRadius: '16px',
                            textTransform: 'none',
                            py: 1.2,
                            fontWeight: 600,
                            borderColor: 'var(--color-border)',
                            color: 'var(--color-text)',
                            '&:hover': {
                                borderColor: 'var(--color-primary)',
                                backgroundColor: 'var(--color-hover)',
                            },
                        }}
                    >
                        {cancelText}
                    </Button>
                    <Button
                        onClick={handleConfirm}
                        disabled={isLoading}
                        variant="contained"
                        color={confirmColor}
                        sx={{
                            flex: 1,
                            borderRadius: '16px',
                            textTransform: 'none',
                            py: 1.2,
                            fontWeight: 600,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-1px)',
                                boxShadow: '0 8px 20px rgba(59, 130, 246, 0.3)',
                            },
                        }}
                    >
                        {isLoading ? 'Procesando...' : confirmText}
                    </Button>
                </Box>
            }
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                    py: 2,
                }}
            >
                <Box
                    sx={{
                        width: 64,
                        height: 64,
                        borderRadius: '50%',
                        backgroundColor: config.bgColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Icon size={32} color={config.color} />
                </Box>

                <Typography
                    variant="body1"
                    sx={{
                        color: 'var(--color-text)',
                        textAlign: 'center',
                        opacity: 0.9,
                        lineHeight: 1.6,
                    }}
                >
                    {message}
                </Typography>
            </Box>
        </Modal>
    );
};

export default ConfirmDialog;
