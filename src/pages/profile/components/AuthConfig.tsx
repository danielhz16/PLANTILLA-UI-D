import { Box, Divider, Typography } from "@mui/material";
import { MainCard } from "@/components/cards/MainCard";
import { CONFIG_MFA } from "@/features/profile/const/configMfa";
import { useAuthStore } from "@/features/auth";
import { CheckboxLabel } from "@/components/form/inputs/CheckboxLabel";
import { ModalMfaApp } from "./ModalMfaApp";
import { ModalMfaSuccess } from "./ModalMfaSuccess";
import { useActivateMfa } from "../hooks/useActivateMfa";
import { Preview } from "@/components";

export const AuthConfig = () => {
    const { user } = useAuthStore();
    const { handleSelectMfa, modalOpen, setModalOpen, optionsActive, handleConfirModal, descriptionModalSelected, isDeactivate, optionActive, isLoading, isPending, isVerifying, verifyError, handleVerificarCodigo, mfaVerified, mfaSuccessMessage, closeSuccessModal, urlKey, successText } = useActivateMfa();

    if (!user) return null;

    return (
        <MainCard sx={{ p: 3 }}>
            <Typography
                variant="caption"
                sx={{
                    color: 'var(--color-text-secondary)',
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    fontSize: '0.65rem',
                    display: 'block',
                    mb: 1.5,
                }}
            >
                Autenticación en dos pasos
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {CONFIG_MFA.map((mfa, index) => (
                    <Box key={mfa.id}>
                        {index > 0 && (
                            <Divider sx={{ borderColor: 'var(--color-border)', opacity: 0.4, my: 1 }} />
                        )}
                        <Preview loading={isLoading}>
                            <CheckboxLabel
                            label={mfa.label}
                            description={mfa.description}
                            checked={optionsActive[mfa.id]}
                            onChange={() => handleSelectMfa(mfa.id)}
                        />
                        </Preview>
                    </Box>
                ))}
            </Box>
            <ModalMfaApp 
            open={modalOpen} 
            onClose={setModalOpen}
            onConfirm={handleConfirModal}
            description={descriptionModalSelected}
            deactivate={isDeactivate}
            type={optionActive}
            isPending={isPending}
            isVerifying={isVerifying}
            verifyError={verifyError}
            onVerify={handleVerificarCodigo}
            qr={urlKey}
            successText={successText}
             />
            <ModalMfaSuccess
                open={mfaVerified}
                message={mfaSuccessMessage}
                onClose={closeSuccessModal}
             />
        </MainCard>
    );
};

export default AuthConfig;
