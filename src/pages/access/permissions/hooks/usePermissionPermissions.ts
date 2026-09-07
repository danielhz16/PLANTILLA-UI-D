import { useAuth, TYPES_AUTHORIZATIONS } from "@/features/auth";
import { PERMISSIONS } from "@/features/permissions";

export const usePermissionPermissions = () => {
    const { validarPermiso } = useAuth();

    return {
        canWrite: validarPermiso(PERMISSIONS.MODULE, TYPES_AUTHORIZATIONS.Write),
        canRead: validarPermiso(PERMISSIONS.MODULE, TYPES_AUTHORIZATIONS.Read),
    };
};
