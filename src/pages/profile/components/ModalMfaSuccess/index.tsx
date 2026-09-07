import { Modal, Animation } from "@/components";
import { Box, Typography } from "@mui/material";
import secureOkAnimation from "@/assets/animation/secureOk.json";
import type { FC } from "react";

interface ModalMfaSuccessProps {
    open: boolean;
    message: string;
    onClose: () => void;
}

export const ModalMfaSuccess: FC<ModalMfaSuccessProps> = ({
    open,
    message,
    onClose,
}) => {
    return (
<Modal
            open={open}
            onClose={onClose}
            maxWidth="sm"
            hiddenHeader
            sx={{ width: 480 }}
            onSuccess={onClose}
            showButtonSuccess
            successText="Listo"
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 360,
                    gap: 2.5,
                    py: 3,
                }}
            >
                <Animation
                    src={secureOkAnimation}
                    loop={false}
                    autoplay
                    style={{ width: 190, height: 190 }}
                />

                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 700,
                        color: 'var(--color-text)',
                        textAlign: 'center',
                    }}
                >
                    ¡Activación exitosa!
                </Typography>

                <Typography
                    variant="body2"
                    sx={{
                        color: 'var(--color-text-secondary)',
                        textAlign: 'center',
                        lineHeight: 1.7,
                        maxWidth: 320,
                    }}
                >
                    {message}
                </Typography>
            </Box>
        </Modal>
    );
};

export default ModalMfaSuccess;