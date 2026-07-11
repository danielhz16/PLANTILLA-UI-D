import { useAuth, TYPES_AUTHORIZATIONS, PERMISSIONS } from "@/common";

export const usePermissionPermissions = () => {
    const { validarPermiso } = useAuth();

    return {
        canWrite: validarPermiso(PERMISSIONS.MODULE, TYPES_AUTHORIZATIONS.Write),
        canRead: validarPermiso(PERMISSIONS.MODULE, TYPES_AUTHORIZATIONS.Read),
    };
};
