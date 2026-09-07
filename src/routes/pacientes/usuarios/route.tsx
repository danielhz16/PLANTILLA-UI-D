import { Users } from "lucide-react";
import type { RouteNode } from "@/lib/routecraft";

export const usuariosRoutes: RouteNode[] = [{
    name: "Usuarios Paciente",
    route: "usuarios",
    sub: [
        { name: "Usuarios Paciente", route: "list", menuRoute: true, icon: <Users size={20} />, component: () => import("@/pages/pacientes/users/ListPacientesUsers") },
    ],
}];
