import type { RouteConfig } from "../ts";
import MainLayout from "@/components/layout/MainLayout";
import clientesListRoutes from "./clientes/index.routes";
import usuariosRoutes from "./usuarios/index.routes";
import permisosRoutes from "./permisos/index.routes";
import rolesRoutes from "./roles/index.routes";

const clientesRoutes: RouteConfig = {
    path: "/clientes",
    element: <MainLayout />,
    children: [
        clientesListRoutes,
        usuariosRoutes,
        permisosRoutes,
        rolesRoutes,
    ],
};

export default clientesRoutes;
