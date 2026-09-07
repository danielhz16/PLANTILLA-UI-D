import { lazyLoad, simpleRoute } from "../../routes.factory";
import type { RouteConfig } from "../../ts";

const List = lazyLoad(() => import("../../../pages/private/pacientes/users/ListPacientesUsers"));

const usuariosRoutes: RouteConfig = {
    path: "usuarios",
    children: [
        simpleRoute("list", List),
    ],
};

export default usuariosRoutes;
