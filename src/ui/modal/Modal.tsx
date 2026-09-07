import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    Typography,
    IconButton,
    type SxProps,
    type Theme,
} from '@mui/material';
import { X } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    actions?: React.ReactNode;
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
    fullWidth?: boolean;
    showCloseButton?: boolean;
    disableBackdropClick?: boolean;
    sx?: SxProps<Theme>;
}

export const Modal: React.FC<ModalProps> = ({
    open,
    onClose,
    title,
    children,
    actions,
    maxWidth = 'md',
    fullWidth = true,
    showCloseButton = true,
    disableBackdropClick = false,
    sx: sxProp,
}) => {

    const handleClose = (event: {}, reason?: string) => {
        if (disableBackdropClick && reason === 'backdropClick') {
            return;
        }
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth={maxWidth}
            fullWidth={fullWidth}
            PaperProps={{
                sx: {
                    borderRadius: '24px',
                    backgroundColor: 'var(--color-bgCard)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid var(--color-border)',
                    boxShadow: '0 25px 50px -12px var(--color-shadowCard)',
                    overflow: 'hidden',
                    position: 'relative',
                   
                    ...((sxProp ?? {}) as Record<string, any>),
                },
            }}
        >
            {(title || showCloseButton) && (
                <DialogTitle
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        p: 3,
                        pb: 2,
                        borderBottom: '1px solid var(--color-border)',
                    }}
                >
                    {title && (
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 700,
                                color: 'var(--color-text)',
                                letterSpacing: '-0.02em',
                            }}
                        >
                            {title}
                        </Typography>
                    )}
                    {showCloseButton && (
                        <IconButton
                            onClick={onClose}
                            sx={{
                                color: 'var(--color-text)',
                                opacity: 0.7,
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                    opacity: 1,
                                    backgroundColor: 'var(--color-hover)',
                                    transform: 'rotate(90deg)',
                                },
                            }}
                        >
                            <X size={20} />
                        </IconButton>
                    )}
                </DialogTitle>
            )}

            <DialogContent
                sx={{
                    p: 3,
                    color: 'var(--color-text)',
                }}
            >
                {children}
            </DialogContent>

            {actions && (
                <DialogActions
                    sx={{
                        p: 3,
                        pt: 2,
                        borderTop: '1px solid var(--color-border)',
                        gap: 1.5,
                    }}
                >
                    {actions}
                </DialogActions>
            )}
        </Dialog>
    );
};

export default Modal;
