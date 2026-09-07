import { UserRoundKey } from "lucide-react";
import type { RouteNode } from "@/lib/routecraft";
import { ROLES } from "@/features/roles";
import { TYPES_AUTHORIZATIONS } from "@/features/auth";

export const rolesRoutes: RouteNode[] = [{
    name: "Roles",
    route: "roles",
    sub: [
        { name: "Roles", route: "list", menuRoute: true, icon: <UserRoundKey size={20} />, auth: [ROLES.MODULE, TYPES_AUTHORIZATIONS.Read], component: () => import("@/pages/access/roles/list/ListRoles") },
        { name: "Crear rol", route: "create", auth: [ROLES.MODULE, TYPES_AUTHORIZATIONS.Write], component: () => import("@/pages/access/roles/details/DetailsRoles") },
        { name: "Detalle rol", route: "details/:id", auth: [ROLES.MODULE, TYPES_AUTHORIZATIONS.Write], component: () => import("@/pages/access/roles/details/DetailsRoles") },
    ],
}];
