import { Shield } from "lucide-react";
import type { RouteNode } from "@/lib/routecraft";
import { PERMISSIONS } from "@/features/permissions";
import { TYPES_AUTHORIZATIONS } from "@/features/auth";

export const permisosRoutes: RouteNode[] = [{
    name: "Permisos",
    route: "permisos",
    sub: [
        { name: "Permisos", route: "list", menuRoute: true, icon: <Shield size={20} />, auth: [PERMISSIONS.MODULE, TYPES_AUTHORIZATIONS.Read], component: () => import("@/pages/access/permissions/list/ListPermissions") },
        { name: "Crear permiso", route: "create", auth: [PERMISSIONS.MODULE, TYPES_AUTHORIZATIONS.Write], component: () => import("@/pages/access/permissions/details/PermissionsDetails") },
        { name: "Detalle permiso", route: "details/:id", auth: [PERMISSIONS.MODULE, TYPES_AUTHORIZATIONS.Write], component: () => import("@/pages/access/permissions/details/PermissionsDetails") },
    ],
}];
