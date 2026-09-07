import { Microscope } from "lucide-react";
import type { RouteNode } from "@/lib/routecraft";

export const laboratorioRoutes: RouteNode[] = [{
    name: "Laboratorio",
    route: "laboratorio",
    useLayout: true,
    menuRoute: true,
    icon: <Microscope size={20} />,
    sub: [{
        name: "Laboratorio",
        route: "",
        component: () => import("@/pages/laboratory/Laboratory"),
    }],
}];
