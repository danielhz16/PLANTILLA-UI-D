import Loadable from "../../common/components/loading/Lazy";
import { lazy } from "react";
import type { Routes } from "../ts";
import { PublicRoute } from "../protector/PublicRoute";

const Login = Loadable(lazy(() => import("../../pages/public/auth/Login")));

const authRoutes: Routes = {
    path: "/auth",
    children: [
        {
            path: "login",
            element: (
                <PublicRoute>
                    <Login />
                </PublicRoute>
            )
        }
    ]
};

export default authRoutes