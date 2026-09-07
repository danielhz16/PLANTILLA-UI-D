import { Building2 } from "lucide-react";
import type { RouteNode } from "@/lib/routecraft";
import { COMPANY } from "@/features/company";
import { TYPES_AUTHORIZATIONS } from "@/features/auth";

export const clientesListRoutes: RouteNode[] = [{
    name: "Clientes",
    route: "",
    sub: [
        { name: "Clientes", route: "list", menuRoute: true, icon: <Building2 size={20} />, auth: [COMPANY.MODULE, TYPES_AUTHORIZATIONS.Read], component: () => import("@/pages/company/list/ListCompany") },
        { name: "Crear cliente", route: "crear", auth: [COMPANY.MODULE, TYPES_AUTHORIZATIONS.Write], component: () => import("@/pages/company/details/Details") },
        { name: "Detalle cliente", route: "detalles/:id", auth: [COMPANY.MODULE, TYPES_AUTHORIZATIONS.Write], component: () => import("@/pages/company/details/Details") },
    ],
}];
