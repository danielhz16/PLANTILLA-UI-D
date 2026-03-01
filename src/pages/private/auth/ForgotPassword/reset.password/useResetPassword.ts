import { useMutationQuery } from "@/hooks/api/useMutationQuery";
import { useParams, useNavigate } from "react-router";
import { useRef } from "react";
import type { RefForm } from "@/common";

export const useResetPassword = () => {
    const formRef = useRef<RefForm>(null);
    const navigate = useNavigate();
    const mutation = useMutationQuery({
        url: 'auth/reset-password',
        method: 'POST',
    });

    const { token } = useParams<{ token: string }>();

    const toLogin = () => navigate('/auth/login');

    const handleSubmbit = async (data = {}) => {
        console.log('Data recibida en handleSubmit:', data);
        await mutation.mutateAsync({ ...data, token });
        toLogin();
    };

    const save = () => formRef?.current?.save();

    return {
        handleSubmbit,
        formRef,
        save,
        toLogin,
    };
};
