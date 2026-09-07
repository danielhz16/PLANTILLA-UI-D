import { Building2 } from "lucide-react";
import type { RouteNode } from "@/lib/routecraft";
import { clientesListRoutes } from "./clientes/route";
import { usuariosRoutes } from "./usuarios/route";
import { permisosRoutes } from "./permisos/route";
import { rolesRoutes } from "./roles/route";

export const clientesRoutes: RouteNode[] = [{
    name: "Clientes",
    route: "clientes",
    useLayout: true,
    icon: <Building2 size={20} />,
    sub: [
        ...clientesListRoutes,
        ...usuariosRoutes,
        ...permisosRoutes,
        ...rolesRoutes,
    ],
}];
