import { Hospital } from "lucide-react";
import type { RouteNode } from "@/lib/routecraft";

export const hospitalRoutes: RouteNode[] = [{
    name: "Hospital",
    route: "hospital",
    useLayout: true,
    menuRoute: true,
    icon: <Hospital size={20} />,
    sub: [{
        name: "Hospital",
        route: "",
        component: () => import("@/pages/hospital/Hospital"),
    }],
}];
