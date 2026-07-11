import { useAuth, TYPES_AUTHORIZATIONS, ROLES } from "@/common";


export const usePermissionRoles = () => {
    const { validarPermiso } = useAuth();

    return {
        canWrite: validarPermiso(ROLES.MODULE, TYPES_AUTHORIZATIONS.Write),
        canRead: validarPermiso(ROLES.MODULE, TYPES_AUTHORIZATIONS.Read),
    };
};