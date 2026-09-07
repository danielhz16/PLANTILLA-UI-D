import { Home } from "lucide-react";
import type { RouteNode } from "@/lib/routecraft";

export const dashboardRoutes: RouteNode[] = [{
    name: "Dashboard",
    route: "dashboard",
    useLayout: true,
    menuRoute: true,
    icon: <Home size={20} />,
    sub: [{
        name: "Dashboard",
        route: "",
        component: () => import("@/pages/dashboard/Dashboard"),
    }],
}];
