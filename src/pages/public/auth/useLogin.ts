import { useMutationQuery } from "@/hooks/api/useMutationQuery";
import { useRef, useState } from "react";
import type { RefForm, ResponseLogin } from "@/common";
import { ERRORS } from "@/const/errors";
import { useNavigate } from "react-router";

export const useLogin = () => {
  const nav = useNavigate();
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

      setPendingLogin(null);
      setOpenMfa(false);
      nav('/');
    } catch (error: any) {
      if (Number(error?.code) === ERRORS.MFA_PENDING) {
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
