import type { RouteConfig } from "./ts";
import { createBrowserRouter, Navigate } from "react-router";
import { useAuthStore } from "@/common";
import { lazyLoad } from "./routes.factory";
import authRoutes from "./auth/index.routes";
import dashboardRoutes from "./dashboard/index.routes";
import gestionUsuariosRoutes from "./gestion-usuarios/index.routes";
import clientesRoutes from "./clientes/index.routes";
import pacientesRoutes from "./pacientes/index.routes";
import laboratorioRoutes from "./laboratorio/index.routes";
import clinicaRoutes from "./clinica/index.routes";
import hospitalRoutes from "./hospital/index.routes";

const Unauthorized = lazyLoad(() => import("../pages/public/Unauthorized"));

const unauthorizedRoute: RouteConfig = {
    path: "/unauthorized",
    element: <Unauthorized />,
};

const RootRedirect = () => {
    const { user } = useAuthStore();
    return <Navigate to={user ? "/dashboard" : "/auth/login"} replace />;
};

const rootRoute: RouteConfig = {
    path: "/",
    element: <RootRedirect />,
};

const loginRedirect: RouteConfig = {
    path: "/login",
    element: <Navigate to="/auth/login" replace />,
};

const routes: RouteConfig[] = [
    rootRoute,
    authRoutes,
    unauthorizedRoute,
    dashboardRoutes,
    gestionUsuariosRoutes,
    clientesRoutes,
    pacientesRoutes,
    laboratorioRoutes,
    clinicaRoutes,
    hospitalRoutes,
    loginRedirect,
];

const router = createBrowserRouter(routes);

export default router;
