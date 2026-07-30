import { useAuth, TYPES_AUTHORIZATIONS } from "@/features/auth";
import { ROLES } from "@/features/roles";


export const usePermissionRoles = () => {
    const { validarPermiso } = useAuth();

    return {
        canWrite: validarPermiso(ROLES.MODULE, TYPES_AUTHORIZATIONS.Write),
        canRead: validarPermiso(ROLES.MODULE, TYPES_AUTHORIZATIONS.Read),
    };
};