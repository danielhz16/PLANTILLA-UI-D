import { Loader, Modal, Animation } from "@/components";
import qrAnimation from "@/assets/animation/qr.json";
import { Box, Typography, TextField } from "@mui/material";
import { Mail, MessageCircle, KeyRound, ShieldCheck } from "lucide-react";
import { TypeMfa } from "@/features/profile/enums/mfa";
import { useTheme } from "@/hooks/useTheme";
import type { FC, ComponentType, ChangeEvent, ClipboardEvent, SyntheticEvent } from "react";
import { useState } from "react";
import { ReactQRCode } from '@lglab/react-qr-code'

interface ModalMfaAppProps {
    open: boolean;
    onClose: () => void;
    onConfirm?: () => void;
    onVerify?: (code: string) => void;
    description: string;
    deactivate?: boolean;
    type?: TypeMfa | null;
    isPending: boolean;
    isVerifying?: boolean;
    verifyError?: string;
    qr?: string | null;
    successText?: string;
}

const METHOD_CONFIG: Record<TypeMfa, {
    icon: ComponentType<{ size?: number }>;
    color: string;
    soft: string;
}> = {
    [TypeMfa.Email]: {
        icon: Mail,
        color: 'var(--color-primary)',
        soft: 'var(--color-infoSoft)',
    },
    [TypeMfa.WhatsApp]: {
        icon: MessageCircle,
        color: 'var(--color-success)',
        soft: 'var(--color-successSoft)',
    },
    [TypeMfa.AuthenticatorApp]: {
        icon: KeyRound,
        color: 'var(--color-secondary)',
        soft: 'rgba(139, 92, 246, 0.12)',
    },
};

const OTP_LENGTH = 6;

export const ModalMfaApp: FC<ModalMfaAppProps> = ({
    open,
    onClose,
    onConfirm,
    onVerify,
    description,
    deactivate = false,
    type,
    isPending,
    isVerifying = false,
    verifyError = '',
    qr,
    successText = 'Aceptar'
}) => {
    const { isDark } = useTheme();
    const [otp, setOtp] = useState('');

    const handleCloseModal = () => {
        setOtp('');
        onClose();
    };

    const handleVerify = () => {
        if (otp.length === OTP_LENGTH) onVerify?.(otp);
    };

    const handleOtpChange = (event: ChangeEvent<HTMLInputElement>) => {
        setOtp(event.target.value.replace(/\D/g, '').slice(0, OTP_LENGTH));
    };

    const config = type != null
        ? METHOD_CONFIG[type]
        : { icon: ShieldCheck, color: 'var(--color-primary)', soft: 'var(--color-primarySoft)' };

    const Icon = config.icon;
    const color = deactivate ? 'var(--color-warning)' : config.color;
    const soft = deactivate ? 'var(--color-warningSoft)' : config.soft;

    const handlePaste = (event: ClipboardEvent) => {
        event.preventDefault();
        const digits = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
        if (!digits) return;
        setOtp(digits);
    };

    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        handleVerify();
    };

    return (
        <Modal
            open={open}
            onClose={handleCloseModal}
            maxWidth="sm"
            hiddenHeader
            sx={{ width: 480 }}
            onSuccess={qr ? handleVerify : onConfirm}
            showButtonSuccess
            showButtonCancel
            successText={successText}
            cancelText="Cancelar"
        >
            {
                qr ? (
                    <Box
                        component="form"
                        onSubmit={handleSubmit}

                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minHeight: 360,
                            gap: 1.5,
                            py: 2,
                        }}
                    >
                        <Box
                            sx={{
                                p: 3,
                                backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : '#ffffff',
                                border: `1px solid var(--color-border)`,
                                borderRadius: '20px',
                                boxShadow: '0 8px 24px -12px rgba(0,0,0,0.2)',
                                lineHeight: 0,
                            }}
                        >
                            <ReactQRCode value={qr} size={200} level="M" marginSize={2} />
                        </Box>

                        <Typography
                            variant="body2"
                            sx={{
                                color: 'var(--color-text)',
                                textAlign: 'center',
                                maxWidth: 360,
                            }}
                        >
                            Una vez escaneado, escribe el código de 6 dígitos que genera tu app para confirmar la activación.
                        </Typography>

                        <TextField
                            autoFocus
                            value={otp}
                            onChange={handleOtpChange}
                            onPaste={handlePaste}
                            placeholder="••••••"
                            inputProps={{
                                inputMode: 'numeric',
                                pattern: '[0-9]*',
                                maxLength: OTP_LENGTH,
                                autoComplete: 'one-time-code',
                                style: {
                                    textAlign: 'center',
                                    fontSize: '1.15rem',
                                    fontWeight: 600,
                                    letterSpacing: 12,
                                    padding: '8px 16px',
                                },
                            }}
                            sx={{
                                width: 220,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '12px',
                                    backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : '#ffffff',
                                },
                                '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'var(--color-primary)',
                                },
                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'var(--color-primary)',
                                },
                            }}
                        />

                        {verifyError && (
                            <Typography variant="body2" color="error" sx={{ textAlign: 'center' }}>
                                {verifyError}
                            </Typography>
                        )}
                    </Box>
                ) : (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minHeight: 360,
                            gap: 2.5,
                            py: 2,
                        }}
                    >
                        {type === TypeMfa.AuthenticatorApp && !deactivate ? (
                            <Animation
                                src={qrAnimation}
                                loop
                                autoplay
                                style={{ width: 180, height: 180 }}
                            />
                        ) : (
                            <Box
                                sx={{
                                    width: 64,
                                    height: 64,
                                    borderRadius: '50%',
                                    backgroundColor: soft,
                                    color,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: isDark
                                        ? `0 0 0 1px ${soft}`
                                        : undefined,
                                }}
                            >
                                <Icon size={30} />
                            </Box>
                        )}

                        <Typography
                            variant="body2"
                            sx={{
                                color: 'var(--color-text)',
                                textAlign: 'center',
                                lineHeight: 1.7,
                                maxWidth: 420,
                            }}
                        >
                            {description}
                        </Typography>
                    </Box>
                )
            }
            <Loader isPending={isPending || isVerifying} />

        </Modal>
    );
};

export default ModalMfaApp;