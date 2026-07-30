import { useAuthStore, type ResponseLogin } from "@/features/auth";
import { callApi } from "@/hooks/api/base.api";
import { MfaForm } from "./MfaModal";
import { Modal } from "@/components/modal/Modal";
import { useState } from "react";

export const GlobalMfaModal = () => {
  const mfaPending = useAuthStore((s) => s.mfaPending);
  const setMfaPending = useAuthStore((s) => s.setMfaPending);
  const loginUser = useAuthStore((s) => s.loginUser);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (data: { code: string }) => {
    setIsPending(true);
    try {
      const res = (await callApi<ResponseLogin>("auth/mfa", "POST", { code: data.code })) as ResponseLogin;
      if (res.user) {
        loginUser(res);
      }
      window.location.href = "/";
    } catch (error) {
      setIsPending(false);
      throw error;
    }
  };

  const handleResend = async (): Promise<number> => {
    const res = await callApi<{ retryAfter?: number }>("auth/mfa/resend", "POST", {});
    return res?.retryAfter ?? 60;
  };

  const handleClose = () => {
    setMfaPending(false);
  };

  const handleBackToLogin = () => {
    setMfaPending(false);
    useAuthStore.getState().logoutUser();
    window.location.href = "/auth/login";
  };

  if (!mfaPending) return null;

  return (
    <Modal
      open={true}
      onClose={handleClose}
      title="Autenticación en dos pasos"
      maxWidth="sm"
      sx={{ width: '100%', maxWidth: 580, p: 0 }}
    >
      <MfaForm
        key="global-mfa"
        handleSubmit={handleSubmit}
        isPending={isPending}
        toLogin={handleBackToLogin}
        onClose={handleClose}
        resendCode={handleResend}
      />
    </Modal>
  );
};
