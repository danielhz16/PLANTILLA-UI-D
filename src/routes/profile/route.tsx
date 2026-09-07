import type { RouteNode } from "@/lib/routecraft";

export const profileRoutes: RouteNode[] = [{
    name: "Perfil",
    route: "profile",
    useLayout: true,
    sub: [{
        name: "Perfil",
        route: "",
        component: () => import("@/pages/profile"),
    }],
}];
