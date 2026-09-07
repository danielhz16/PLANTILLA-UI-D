import type { RouteNode } from "@/lib/routecraft";

export const authRoutes: RouteNode[] = [{
    name: "Auth",
    route: "/auth",
    sub: [
        { name: "Login", route: "login", isPublic: true, component: () => import("@/pages/public/auth/Login") },
        { name: "Recuperar contraseña", route: "forgot", isPublic: true, component: () => import("@/pages/public/auth/forgot/Forgot") },
        { name: "Restablecer contraseña", route: "reset-password/:token", isPublic: true, component: () => import("@/pages/public/auth/reset-password/ResetPassword") },
    ],
}];
