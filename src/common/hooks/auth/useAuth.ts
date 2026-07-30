import { type TypeAuth, useAuthStore } from "@/common";

export const useAuth = () => {
    const { permissions } = useAuthStore();
    const validarPermiso = (name: string, level: TypeAuth ) => {
        const match = (permissions || []).filter((p) => p.name === name);
        if (match.length === 0) return false;
        const maxType = Math.max(...match.map((p) => p.type));
        return maxType >= level;
    }

    return {
        validarPermiso
    }
}