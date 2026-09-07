import { CONFIG_MFA } from "@/features/profile/const/configMfa";
import { TypeMfa } from "@/features/profile/enums/mfa";
import { useGetQuery, useMutationQuery } from "@/hooks";
import { useEffect, useMemo, useState } from "react";

const initialOptionsActive: Record<TypeMfa, boolean> = {
    [TypeMfa.AuthenticatorApp]: false,
    [TypeMfa.Email]: false,
    [TypeMfa.WhatsApp]: false,
};

type ModalAction = 'activate' | 'deactivate';

type MfaMutationResponse = {
    urlKey?: string;
    show?: string;
};

export const useActivateMfa = () => {
    const { data, isLoading } = useGetQuery<Record<TypeMfa, boolean>>('/users/mfa', 'methods-mfa', true);
    const mutation = useMutationQuery({
        method: "PATCH",
        url: "/users/mfa",
    });
    const verifyMutation = useMutationQuery({
        method: "POST",
        url: "/users/mfa/verify",
        hiddenNotificationSuccess: true,
    });

    const [modalOpen, setModalOpen] = useState(false);
    const [mfaVerified, setMfaVerified] = useState(false);
    const [mfaSuccessMessage, setMfaSuccessMessage] = useState('');
    const [optionActive, setOptionActive] = useState<TypeMfa | null>(null);
    const [modalAction, setModalAction] = useState<ModalAction | null>(null);
    const [qrUrl, setQrUrl] = useState<string | null>(null);
    const [optionsActive, setOptionsActive] = useState<Record<TypeMfa, boolean>>(initialOptionsActive);
    const [verifyError, setVerifyError] = useState<string>('');

    const closeModal = () => {
        setModalOpen(false);
        setOptionActive(null);
        setModalAction(null);
        setQrUrl(null);
        setVerifyError('');
    };

    const handleSelectMfa = async (type: TypeMfa, confirm: boolean = false) => {
        const actualState = optionsActive[type];
        setOptionActive(type);
        setVerifyError('');

        if (!confirm) {
            setModalAction(actualState ? 'deactivate' : 'activate');
            setQrUrl(null);
            setModalOpen(true);
            return;
        }

        const newState = !actualState;

        const response = (await mutation.mutateAsync({ type, value: newState })) as unknown as MfaMutationResponse;

        if (type === TypeMfa.AuthenticatorApp && newState) {
            if (response?.urlKey) {
                setQrUrl(response.urlKey);
                return;
            }
            setOptionsActive((prev) => ({ ...prev, [type]: true }));
            closeModal();
            return;
        }

        setOptionsActive((prev) => ({ ...prev, [type]: newState }));
        closeModal();
    };

    const handleVerificarCodigo = async (code: string) => {
        setVerifyError('');
        try {
            const response = (await verifyMutation.mutateAsync({ code })) as unknown as MfaMutationResponse;
            setOptionsActive((prev) => ({ ...prev, [TypeMfa.AuthenticatorApp]: true }));
            setMfaSuccessMessage(response?.show || 'Autenticación en dos pasos activada exitosamente.');
            closeModal();
            setMfaVerified(true);
        } catch (error) {
            const err = error as { apiError?: { message?: string }; message?: string };
            setVerifyError(err?.apiError?.message || err?.message || 'Código inválido');
            throw error;
        }
    };

    const closeSuccessModal = () => {
        setMfaVerified(false);
        setMfaSuccessMessage('');
    };

    const handleConfirModal = () => {
        if (optionActive == null) return;
        handleSelectMfa(optionActive, true);
    };

    const descriptionModalSelected = useMemo(() => {
        const config = CONFIG_MFA.find((mfa) => mfa.id === optionActive);
        if (!config || optionActive == null) return '';

        return modalAction === 'deactivate' ? config.descriptionModalDeactivate : config.descriptionModal;
    }, [optionActive, modalAction]);

    useEffect(() => {
        if (!data) return;
        setOptionsActive(data);
    }, [data]);

    const isDeactivate = useMemo(() => {
        return modalAction === 'deactivate';
    }, [modalAction]);

    const successText = useMemo(() => {
        if (qrUrl) return 'Verificar y activar';
        return isDeactivate ? 'Desactivar' : 'Configurar';
    }, [qrUrl, isDeactivate]);

    return {
        modalOpen,
        setModalOpen: closeModal,
        handleSelectMfa,
        optionsActive,
        handleConfirModal,
        handleVerificarCodigo,
        verifyError,
        mfaVerified,
        mfaSuccessMessage,
        closeSuccessModal,
        descriptionModalSelected,
        isDeactivate,
        optionActive,
        isLoading,
        isPending: mutation.isPending,
        isVerifying: verifyMutation.isPending,
        urlKey: qrUrl,
        successText
    };

}