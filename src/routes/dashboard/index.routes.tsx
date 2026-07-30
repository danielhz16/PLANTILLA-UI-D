import { lazyLoad, privateRoute } from "../routes.factory";
import type { RouteConfig } from "../ts";
import MainLayout from "@/app/layout/MainLayout";

const Dashboard = lazyLoad(() => import("../../pages/private/dashboard/Dashboard"));

const dashboardRoutes: RouteConfig = {
    path: "/dashboard",
    element: <MainLayout />,
    children: [
        privateRoute("", Dashboard),
    ],
};

export default dashboardRoutes;
