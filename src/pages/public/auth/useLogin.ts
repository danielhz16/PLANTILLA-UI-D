import { useMutationQuery } from "@/hooks/api/useMutationQuery";
import { useRef } from "react";
import { useAuthStore } from "@/common";
import type { RefForm, ResponseLogin } from "@/common";
import { useNavigate } from "react-router";

export const useLogin = () => {
  const { loginUser } = useAuthStore();
  const nav = useNavigate();

  const login = useMutationQuery<ResponseLogin>({
    url: "auth/login",
    method: "POST",
  });

  const formRef = useRef<RefForm>(null);

  const handleSubmit = async (data: {
    username: string;
    password: string;
  }) => {
    const res = await login.mutateAsync(data) as ResponseLogin;
    loginUser({
        permissions: res.permissions,
        user: res.user
    });
    nav('/')
  };
 

  return {
    handleSubmit,
    formRef,
    isPending: login.isPending,
    toForgot: () => nav('/auth/forgot')
  };
};
