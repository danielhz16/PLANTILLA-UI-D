import { useAuthStore } from '../stores/auth-store';
import type { TypeAuth } from '../types';

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

useAuth.validatePermission = (name: string, level: number): boolean => {
    const { permissions } = useAuthStore.getState();
    const match = (permissions || []).filter((p) => p.name === name);
    if (match.length === 0) return false;
    const maxType = Math.max(...match.map((p) => p.type));
    return maxType >= level;
};
