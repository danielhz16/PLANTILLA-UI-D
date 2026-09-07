import { Shield } from "lucide-react";
import type { RouteNode } from "@/lib/routecraft";

export const permisosRoutes: RouteNode[] = [{
    name: "Permisos Cliente",
    route: "permisos",
    sub: [
        { name: "Permisos Cliente", route: "list", menuRoute: true, icon: <Shield size={20} />, component: () => import("@/pages/company/permissions/list/ListCompanyPermissions") },
    ],
}];
