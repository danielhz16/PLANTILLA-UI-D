import authRoutes from "./routes-modules/auth.routes";
import privateRoutes from "./routes-modules/private.routes";
import type { Routes } from "./ts";
import { createBrowserRouter } from "react-router";
import userRoutes from "./routes-modules/user.routes";
import Loadable from "../common/components/loading/Lazy";
import { lazy } from "react";

const Unauthorized = Loadable(lazy(() => import("../pages/public/Unauthorized")));

const unauthorizedRoute: any = {
    path: "/unauthorized",
    element: <Unauthorized />,
};

const routes: Routes[] = [
    authRoutes,
    privateRoutes,
    unauthorizedRoute,
    userRoutes,
];

const router = createBrowserRouter(routes);

export default router;

