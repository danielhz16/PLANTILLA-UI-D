import Loadable from "../../common/components/loading/Lazy";
import { lazy } from "react";
import type { Routes } from "../ts";
import MainLayout from "../../common/components/layout/MainLayout";
import { PrivateRoute } from "../protector/PrivateRoute";

const Dashboard = Loadable(lazy(() => import("../../pages/private/dashboard/Dashboard")));
const Reports = Loadable(lazy(() => import("../../pages/private/reports/Reports")));
const Settings = Loadable(lazy(() => import("../../pages/private/settings/Settings")));
const Demo = Loadable(lazy(() => import("../../pages/private/demo/Demo")));

const privateRoutes: Routes = {
    path: "/",
    element: (
        <PrivateRoute>
            <MainLayout />
        </PrivateRoute>
    ),
    children: [
        {
            path: "",
            element: <Dashboard />
        },
        {
            path: "reports",
            element: <Reports />
        },
        {
            path: "settings",
            element: <Settings />
        },
        {
            path: "demo",
            element: <Demo />
        }
    ]
};

export default privateRoutes;
