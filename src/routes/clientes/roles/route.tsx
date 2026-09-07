import { UserRoundKey } from "lucide-react";
import type { RouteNode } from "@/lib/routecraft";

export const rolesRoutes: RouteNode[] = [{
    name: "Roles Cliente",
    route: "roles",
    sub: [
        { name: "Roles Cliente", route: "list", menuRoute: true, icon: <UserRoundKey size={20} />, component: () => import("@/pages/company/roles/list/ListCompanyRoles") },
    ],
}];
