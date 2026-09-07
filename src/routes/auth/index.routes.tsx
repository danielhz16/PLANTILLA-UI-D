import { lazyLoad, publicRoute } from "../routes.factory";
import type { RouteConfig } from "../ts";

const Login = lazyLoad(() => import("../../pages/public/auth/Login"));
const ForgotPassword = lazyLoad(() => import("../../pages/private/auth/ForgotPassword/forgot/Forgot"));
const ResetPassword = lazyLoad(() => import("../../pages/private/auth/ForgotPassword/reset.password/ResetPassword"));

const authRoutes: RouteConfig = {
    path: "/auth",
    children: [
        publicRoute("login", Login),
        publicRoute("forgot", ForgotPassword),
        publicRoute("reset-password/:token", ResetPassword),
    ],
};

export default authRoutes;
