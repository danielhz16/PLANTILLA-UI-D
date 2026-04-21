import { type TypeAuth, useAuthStore } from "@/common";

export const useAuth = () => {
    const { permissions } = useAuthStore();
    const validarPermiso = (name: string, level: TypeAuth ) => {
        const permission = (permissions || []).find((p) => p.name === name);
        if (!permission) return false;
        return permission.type >= level;
    }

    return {
        validarPermiso
    }
}