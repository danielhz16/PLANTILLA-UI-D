import { callApi } from "@/hooks/api/base.api";
import { useMutationQuery } from "@/hooks/api/useMutationQuery";
import { useRef } from "react";
import { useAuthStore } from "@/common";
import type { RefForm, ResponseLogin } from "@/common";
import { useNavigate } from "react-router";

export const useMfa = (pendingLogin?: ResponseLogin | null) => {
  const { loginUser } = useAuthStore();
  const nav = useNavigate();

  const mfa = useMutationQuery<ResponseLogin>({
    url: "auth/mfa",
    method: "POST",
  });

  const formRef = useRef<RefForm>(null);

  const handleSubmit = async (data: { code: string }) => {
    const res = (await mfa.mutateAsync(data)) as ResponseLogin;

    if (pendingLogin) {
      loginUser(pendingLogin);
    } else if (res.user) {
      loginUser(res);
    }

    nav('/');
  };

  const resendCode = async (): Promise<number> => {
    const res = await callApi<{ retryAfter?: number }>("auth/mfa/resend", "POST", {});
    return res?.retryAfter ?? 60;
  };

  return {
    formRef,
    handleSubmit,
    isPending: mfa.isPending,
    toLogin: () => nav('/auth/login'),
    resendCode,
  };
};
