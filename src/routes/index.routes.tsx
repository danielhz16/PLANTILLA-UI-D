import { useMemo } from "react";
import { Navigate } from "react-router";
import { createRouter } from "@/lib/routecraft";
import MainLayout from "@/app/layout/MainLayout";
import { useAuthStore, useAuth } from "@/features/auth";
import { authRoutes } from "./auth/route";
import { dashboardRoutes } from "./dashboard/route";
import { gestionUsuariosRoutes } from "./gestion-usuarios/route";
import { clientesRoutes } from "./clientes/route";
import { pacientesRoutes } from "./pacientes/route";
import { laboratorioRoutes } from "./laboratorio/route";
import { clinicaRoutes } from "./clinica/route";
import { hospitalRoutes } from "./hospital/route";
import { profileRoutes } from "./profile/route";

const allRoutes = [
    ...authRoutes,
    ...dashboardRoutes,
    ...gestionUsuariosRoutes,
    ...pacientesRoutes,
    ...laboratorioRoutes,
    ...clinicaRoutes,
    ...hospitalRoutes,
    ...profileRoutes,
    ...clientesRoutes,
];

function AppRootRedirect() {
    const { user } = useAuthStore();
    return <Navigate to={user ? "/dashboard" : "/auth/login"} replace />;
}

export default function AppRouter() {
    const { user } = useAuthStore();
    const isAuthenticated = !!user;

    const Router = useMemo(
        () => createRouter({
            routes: allRoutes,
            layoutDefault: MainLayout,
            rootRedirect: AppRootRedirect,
            isAuthenticated,
            validatePermission: useAuth.validatePermission,
        }),
        [isAuthenticated]
    );

    return <Router />;
}
