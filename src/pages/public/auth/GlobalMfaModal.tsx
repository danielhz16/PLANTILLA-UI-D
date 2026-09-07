import { useAuthStore, type MfaOptions, type ResponseLogin } from "@/features/auth";
import { callApi } from "@/hooks/api/base.api";
import { MfaModalShell } from "./MfaModal";
import { useState } from "react";

const DEFAULT_OPTIONS: MfaOptions = { mfaAuthenticator: false, mfaEmail: true, mfaWp: true };

export const GlobalMfaModal = () => {
  const mfaPending = useAuthStore((s) => s.mfaPending);
  const setMfaPending = useAuthStore((s) => s.setMfaPending);
  const loginUser = useAuthStore((s) => s.loginUser);
  const user = useAuthStore((s) => s.user);
  const [isPending, setIsPending] = useState(false);

  const options: MfaOptions = user
    ? {
        mfaAuthenticator: user.mfaAuthenticator ?? false,
        mfaEmail: user.mfaEmail ?? false,
        mfaWp: user.mfaWp ?? false,
      }
    : DEFAULT_OPTIONS;

  const handleSubmit = async (data: { code: string; type: number }) => {
    setIsPending(true);
    try {
      const res = (await callApi<ResponseLogin>("auth/mfa", "POST", { ...data, epoch: Math.floor(Date.now() / 1000) })) as ResponseLogin;
      if (res.user) {
        loginUser(res);
      }
      window.location.href = "/";
    } catch (error) {
      setIsPending(false);
      throw error;
    }
  };

  const handleResend = async (method: number): Promise<number> => {
    const res = await callApi<{ retryAfter?: number }>("auth/mfa/resend", "POST", { type: method });
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
    <MfaModalShell
      open
      onClose={handleClose}
      handleSubmit={handleSubmit}
      handleResend={handleResend}
      handleBackToLogin={handleBackToLogin}
      isPending={isPending}
      options={options}
    />
  );
};