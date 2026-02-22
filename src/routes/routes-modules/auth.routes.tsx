import Loadable from "../../common/components/loading/Lazy";
import { lazy } from "react";
import type { Routes } from "../ts";
import { PublicRoute } from "../protector/PublicRoute";

const Login = Loadable(lazy(() => import("../../pages/public/auth/Login")));
const ForgotPassword = Loadable(lazy(() => import("../../pages/private/auth/ForgotPassword/forgot/Forgot")));
const ResetPassword = Loadable(lazy(() => import("../../pages/private/auth/ForgotPassword/reset.password/ResetPassword")));

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
        },
        {
            path: "forgot",
            element: (
                <PublicRoute>
                    <ForgotPassword />
                </PublicRoute>
            )
        },
        {
            path: "reset-password/:token",
            element: (
                <PublicRoute>
                    <ResetPassword />
                </PublicRoute>
            )
        }
    ]
};

export default authRoutes