import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    IconButton,
    Button,
    Box,
    Grow,
    useMediaQuery,
    useTheme as useMuiTheme,
    type SxProps,
    type Theme,
} from '@mui/material';
import { X } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    content?: React.ReactNode;
    children?: React.ReactNode;
    actions?: React.ReactNode;
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
    fullWidth?: boolean;
    disableBackdropClick?: boolean;
    sx?: SxProps<Theme>;
    showButtonSuccess?: boolean;
    showButtonCancel?: boolean;
    successText?: string;
    cancelText?: string;
    onSuccess?: () => void;
    fullScreenOnMobile?: boolean;
    hiddenHeader?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
    open,
    onClose,
    title,
    description,
    content,
    children,
    actions,
    maxWidth = 'md',
    fullWidth = true,
    disableBackdropClick = false,
    sx: sxProp,
    showButtonSuccess,
    showButtonCancel,
    successText = 'Aceptar',
    cancelText = 'Cancelar',
    onSuccess,
    fullScreenOnMobile = true,
    hiddenHeader = false,
}) => {
    const { colors, theme } = useTheme();
    const muiTheme = useMuiTheme();
    const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
    const isFullScreen = fullScreenOnMobile && isMobile;

    const handleClose = (_event: object, reason?: string) => {
        if (disableBackdropClick && reason === 'backdropClick') {
            return;
        }
        onClose();
    };

    const showFooter = showButtonSuccess || showButtonCancel || actions;

    const fadeTimeout = isMobile ? 200 : 300;

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth={maxWidth}
            fullWidth={fullWidth}
            fullScreen={isFullScreen}
            TransitionComponent={Grow}
            transitionDuration={{
                enter: fadeTimeout,
                exit: isMobile ? 150 : 200,
            }}
            slotProps={{
                backdrop: {
                    sx: {
                        backgroundColor:
                            theme === 'dark'
                                ? 'rgba(5, 9, 18, 0.6)'
                                : 'rgba(15, 23, 42, 0.35)',
                        backdropFilter: `blur(${isMobile ? 4 : 8}px) saturate(140%)`,
                        WebkitBackdropFilter: `blur(${isMobile ? 4 : 8}px) saturate(140%)`,
                    },
                },
                transition: {
                    easing: 'cubic-bezier(0.32, 0.72, 0, 1)',
                },
            }}
            PaperProps={{
                sx: [
                    {
                        borderRadius: isFullScreen ? 0 : '24px',
                        backgroundColor: colors.bgCard,
                        backdropFilter: 'blur(20px)',
                        border: isFullScreen
                            ? 'none'
                            : `1px solid ${colors.border}`,
                        boxShadow: isFullScreen
                            ? 'none'
                            : colors.shadowElevated,
                        overflow: 'hidden',
                        position: 'relative',
                        margin: isFullScreen ? 0 : '32px',
                        maxHeight: isFullScreen ? '100vh' : 'calc(100% - 64px)',
                        display: 'flex',
                        flexDirection: 'column',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '3px',
                            zIndex: 2,
                            background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                            pointerEvents: 'none',
                        },
                        '& .MuiDialogContent-root': {
                            overflowY: 'auto',
                            '&::-webkit-scrollbar': {
                                width: '6px',
                            },
                            '&::-webkit-scrollbar-track': {
                                background: 'transparent',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                backgroundColor: colors.border,
                                borderRadius: 8,
                                '&:hover': {
                                    backgroundColor: colors.textMuted,
                                },
                            },
                        },
                    },
                    ...(sxProp != null
                        ? Array.isArray(sxProp)
                            ? sxProp
                            : [sxProp]
                        : []),
                ],
            }}
        >
            {!hiddenHeader && (
            <DialogTitle
                sx={{
                    position: 'relative',
                    p: { xs: 2.5, sm: 3 },
                    pb: { xs: 2, sm: 2 },
                    borderBottom: `1px solid ${colors.border}`,
                    backgroundColor: colors.bgCard,
                    flexShrink: 0,
                    overflow: 'hidden',
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: -40,
                        right: -40,
                        width: 180,
                        height: 180,
                        borderRadius: '50%',
                        background: `radial-gradient(circle, ${colors.primarySoft}, transparent 70%)`,
                        pointerEvents: 'none',
                    }}
                />
                <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1 }}>
                    <Box sx={{ minWidth: 0, pt: 0.5 }}>
                        {title && (
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 700,
                                    color: colors.text,
                                    letterSpacing: '-0.02em',
                                    fontSize: { xs: '1.1rem', sm: '1.4rem' },
                                }}
                            >
                                {title}
                            </Typography>
                        )}
                        {description && (
                            <Typography
                                variant="body2"
                                sx={{
                                    color: colors.textSecondary,
                                    fontWeight: 400,
                                    mt: 0.5,
                                }}
                            >
                                {description}
                            </Typography>
                        )}
                    </Box>
                    <IconButton
                        onClick={onClose}
                        aria-label="Cerrar"
                        sx={{
                            color: colors.textSecondary,
                            width: 36,
                            height: 36,
                            borderRadius: '50%',
                            border: `1px solid ${colors.border}`,
                            backgroundColor: colors.bgCard,
                            opacity: 0.9,
                            transition: 'all 0.2s ease',
                            flexShrink: 0,
                            '&:hover': {
                                opacity: 1,
                                color: colors.text,
                                backgroundColor: colors.hover,
                                borderColor: colors.primary,
                                transform: 'rotate(90deg)',
                            },
                        }}
                    >
                        <X size={18} />
                    </IconButton>
                </Box>
            </DialogTitle>
            )}

            <DialogContent
                sx={{
                    p: { xs: 2.5, sm: 3 },
                    color: colors.text,
                    flexGrow: 1,
                }}
            >
                {content ?? children}
            </DialogContent>

            {showFooter && (
                <DialogActions
                    sx={{
                        p: { xs: 2, sm: 3 },
                        pt: 2,
                        borderTop: `1px solid ${colors.border}`,
                        backgroundColor: colors.bgCard,
                        gap: 1.5,
                        flexShrink: 0,
                        justifyContent: hiddenHeader ? 'center' : 'flex-end',
                        pb: { xs: 'calc(16px + env(safe-area-inset-bottom))', sm: 3 },
                    }}
                >
                    {showButtonCancel && (
                        <Button
                            onClick={onClose}
                            variant="outlined"
                            sx={{
                                borderRadius: '14px',
                                textTransform: 'none',
                                py: { xs: 1, sm: 1.2 },
                                px: 3,
                                fontWeight: 600,
                                minWidth: 100,
                                borderColor: colors.border,
                                color: colors.text,
                                backgroundColor: colors.bgCard,
                                '&:hover': {
                                    borderColor: colors.primary,
                                    backgroundColor: colors.hover,
                                },
                            }}
                        >
                            {cancelText}
                        </Button>
                    )}
                    {showButtonSuccess && (
                        <Button
                            onClick={onSuccess}
                            variant="contained"
                            sx={{
                                borderRadius: '14px',
                                textTransform: 'none',
                                py: { xs: 1, sm: 1.2 },
                                px: 3,
                                fontWeight: 600,
                                minWidth: 100,
                                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                                color: `${colors.textOnPrimary} !important`,
                                boxShadow: `0 8px 20px -4px ${colors.buttonShadow}`,
                                '&:hover': {
                                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                                    boxShadow: `0 12px 28px -4px ${colors.buttonShadowHover}`,
                                },
                            }}
                        >
                            {successText}
                        </Button>
                    )}
                    {actions}
                </DialogActions>
            )}
        </Dialog>
    );
};

export default Modal;