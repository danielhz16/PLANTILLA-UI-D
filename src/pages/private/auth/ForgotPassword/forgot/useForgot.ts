import { useMutationQuery } from "@/hooks/api/useMutationQuery";
import { useRef } from "react";
import type { RefForm } from "@/common";
import { useNavigate } from "react-router";

export const useForgotPassword = () => {
    const navigate = useNavigate();
     const formRef = useRef<RefForm>(null);
    const mutation = useMutationQuery({
        url: 'auth/forgot-password',
        method: 'POST',
    });
    
    const toLogin = () => navigate('/auth/login');

    const handleSubmbit = async (data = {}) => {
        await mutation.mutateAsync(data);
        toLogin();
    }

    const save = formRef?.current?.save
      
    return {
        formRef,
        save,
        handleSubmbit,
        toLogin,
        isPending: mutation.isPending
    }

};