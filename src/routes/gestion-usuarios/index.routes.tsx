import type { RouteConfig } from "../ts";
import MainLayout from "@/components/layout/MainLayout";
import usuariosRoutes from "./usuarios/index.routes";
import permisosRoutes from "./permisos/index.routes";
import rolesRoutes from "./roles/index.routes";

const gestionUsuariosRoutes: RouteConfig = {
    path: "/gestion-usuarios",
    element: <MainLayout />,
    children: [
        usuariosRoutes,
        permisosRoutes,
        rolesRoutes,
    ],
};

export default gestionUsuariosRoutes;
