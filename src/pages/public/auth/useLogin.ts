import { useMutationQuery } from "@/hooks/api/useMutationQuery";
import { useRef, useState } from "react";
import type { RefForm } from "@/shared";
import { ERRORS, type ResponseLogin } from "@/features/auth";
import { useAuthStore } from "@/features/auth";
import { useNavigate } from "react-router";

export const useLogin = () => {
  const nav = useNavigate();
  const { loginUser } = useAuthStore();
  const [openMfa, setOpenMfa] = useState(false);
  const [pendingLogin, setPendingLogin] = useState<ResponseLogin | null>(null);

  const login = useMutationQuery<ResponseLogin>({
    url: "auth/login",
    method: "POST",
  });

  const formRef = useRef<RefForm>(null);

  const handleSubmit = async (data: {
    username: string;
    password: string;
  }) => {
    try {
      const res = (await login.mutateAsync(data)) as ResponseLogin;

      if (!res.mfaOk) {
        setPendingLogin(res);
        setOpenMfa(true);
        return;
      }

      loginUser(res);
      setPendingLogin(null);
      setOpenMfa(false);
      nav('/');
    } catch (error: unknown) {
      if (Number((error as { code?: number }).code) === ERRORS.MFA_PENDING) {
        return;
      }
      throw error;
    }
  };

  const handleCloseMfa = () => {
    setOpenMfa(false);
    setPendingLogin(null);
  };

  return {
    handleSubmit,
    formRef,
    isPending: login.isPending,
    toForgot: () => nav('/auth/forgot'),
    openMfa,
    pendingLogin,
    handleCloseMfa,
  };
};
