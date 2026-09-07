import { callApi } from "@/hooks/api/base.api";
import { useMutationQuery } from "@/hooks/api/useMutationQuery";
import { useRef } from "react";
import { useAuthStore, type MfaOptions, type ResponseLogin } from "@/features/auth";
import type { RefForm } from "@/shared";
import { useNavigate } from "react-router";

const DEFAULT_OPTIONS: MfaOptions = { mfaAuthenticator: false, mfaEmail: true, mfaWp: true };

export const useMfa = (pendingLogin?: ResponseLogin | null) => {
  const { loginUser } = useAuthStore();
  const nav = useNavigate();

  const mfa = useMutationQuery<ResponseLogin>({
    url: "auth/mfa",
    method: "POST",
  });

  const formRef = useRef<RefForm>(null);

  const options: MfaOptions = pendingLogin?.user
    ? {
        mfaAuthenticator: pendingLogin.user.mfaAuthenticator ?? false,
        mfaEmail: pendingLogin.user.mfaEmail ?? false,
        mfaWp: pendingLogin.user.mfaWp ?? false,
      }
    : DEFAULT_OPTIONS;

  const handleSubmit = async (data: { code: string; type: number }) => {
    const res = (await mfa.mutateAsync({ ...data, epoch: Math.floor(Date.now() / 1000) })) as ResponseLogin;

    if (pendingLogin) {
      loginUser(pendingLogin);
    } else if (res.user) {
      loginUser(res);
    }

    nav('/');
  };

  const resendCode = async (method: number): Promise<number> => {
    const res = await callApi<{ retryAfter?: number }>("auth/mfa/resend", "POST", { type: method });
    return res?.retryAfter ?? 60;
  };

  return {
    formRef,
    handleSubmit,
    isPending: mfa.isPending,
    toLogin: () => nav('/auth/login'),
    resendCode,
    options,
  };
};