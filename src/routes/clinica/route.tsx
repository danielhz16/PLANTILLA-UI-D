import { Stethoscope } from "lucide-react";
import type { RouteNode } from "@/lib/routecraft";

export const clinicaRoutes: RouteNode[] = [{
    name: "Clínica",
    route: "clinica",
    useLayout: true,
    menuRoute: true,
    icon: <Stethoscope size={20} />,
    sub: [{
        name: "Clínica",
        route: "",
        component: () => import("@/pages/clinic/Clinic"),
    }],
}];
