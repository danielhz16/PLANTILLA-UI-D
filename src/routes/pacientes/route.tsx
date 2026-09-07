import { HeartPulse } from "lucide-react";
import type { RouteNode } from "@/lib/routecraft";
import { usuariosRoutes } from "./usuarios/route";

export const pacientesRoutes: RouteNode[] = [{
    name: "Pacientes",
    route: "pacientes",
    useLayout: true,
    icon: <HeartPulse size={20} />,
    sub: [...usuariosRoutes],
}];
