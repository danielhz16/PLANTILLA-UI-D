import authRoutes from "./routes-modules/auth.routes";
import type { Routes } from "./ts";
import { createBrowserRouter, Navigate } from "react-router";
import userRoutes from "./routes-modules/user.routes";
import Loadable from "../common/components/loading/Lazy";
import { lazy } from "react";
import companyRoutes from "./routes-modules/companies.routes";
import accessPermissionsRoutes from "./routes-modules/access.permissions.routes";
import accessRolesRoutes from "./routes-modules/access.roles.routes";
import { useAuthStore } from "@/common";


const Unauthorized = Loadable(lazy(() => import("../pages/public/Unauthorized")));
import DashboardRoutes from "./routes-modules/dashboard.routes";

const unauthorizedRoute: any = {
    path: "/unauthorized",
    element: <Unauthorized />,
};

const RootRedirect = () => {
    const { user } = useAuthStore();
    return <Navigate to={user ? "/dashboard" : "/auth/login"} replace />;
};

const rootRoute: any = {
    path: "/",
    element: <RootRedirect />,
};


const routes: Routes[] = [
    rootRoute,
    authRoutes,
    unauthorizedRoute,
    userRoutes,
    companyRoutes,
    accessPermissionsRoutes,
    accessRolesRoutes,
    {
        path: "/login",
        element: <Navigate to="/auth/login" replace />,
    },
    DashboardRoutes
];


const router = createBrowserRouter(routes);

export default router;

