import { Users } from "lucide-react";
import type { RouteNode } from "@/lib/routecraft";
import { usuariosRoutes } from "./usuarios/route";
import { permisosRoutes } from "./permisos/route";
import { rolesRoutes } from "./roles/route";

export const gestionUsuariosRoutes: RouteNode[] = [{
    name: "Gestión usuarios",
    route: "gestion-usuarios",
    useLayout: true,
    icon: <Users size={20} />,
    sub: [...usuariosRoutes, ...permisosRoutes, ...rolesRoutes],
}];
