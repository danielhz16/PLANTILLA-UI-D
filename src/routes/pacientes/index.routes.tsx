import type { RouteConfig } from "../ts";
import MainLayout from "@/app/layout/MainLayout";
import usuariosRoutes from "./usuarios/index.routes";

const pacientesRoutes: RouteConfig = {
    path: "/pacientes",
    element: <MainLayout />,
    children: [
        usuariosRoutes,
    ],
};

export default pacientesRoutes;
