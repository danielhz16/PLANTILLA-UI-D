import Loadable from "../../common/components/loading/Lazy";
import { lazy } from "react";
import type { Routes } from "../ts";
import MainLayout from "../../common/components/layout/MainLayout";

const Dashboard = Loadable(lazy(() => import("../../pages/private/dashboard/Dashboard")));
import { PrivateRoute } from "../protector/PrivateRoute";

const dashboardRoutes: Routes = {
    path: "/dashboard",
    element: <MainLayout />,
    children: [
        {
            path: "",
            element: <PrivateRoute children={<Dashboard />} />
        },
    ]
};

export default dashboardRoutes;