import { Users } from "lucide-react";
import type { RouteNode } from "@/lib/routecraft";
import { USERS } from "@/features/users";
import { TYPES_AUTHORIZATIONS } from "@/features/auth";

export const usuariosRoutes: RouteNode[] = [{
    name: "Usuarios",
    route: "usuarios",
    sub: [
        { name: "Usuarios", route: "list", menuRoute: true, icon: <Users size={20} />, auth: [USERS.MODULE, TYPES_AUTHORIZATIONS.Read], component: () => import("@/pages/users/list/ListUsers") },
        { name: "Crear usuario", route: "create", auth: [USERS.MODULE, TYPES_AUTHORIZATIONS.Write], component: () => import("@/pages/users/details/DetailsUser") },
        { name: "Detalle usuario", route: "details/:id", auth: [USERS.MODULE, TYPES_AUTHORIZATIONS.Write], component: () => import("@/pages/users/details/DetailsUser") },
    ],
}];
