import { Users } from "lucide-react";
import type { RouteNode } from "@/lib/routecraft";

export const usuariosRoutes: RouteNode[] = [{
    name: "Usuarios Cliente",
    route: "usuarios",
    sub: [
        { name: "Usuarios Cliente", route: "list", menuRoute: true, icon: <Users size={20} />, component: () => import("@/pages/company/users/list/ListCompanyUsers") },
    ],
}];
