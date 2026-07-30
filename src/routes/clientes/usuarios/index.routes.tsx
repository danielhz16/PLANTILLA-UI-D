import { lazyLoad, simpleRoute } from "../../routes.factory";
import type { RouteConfig } from "../../ts";

const List = lazyLoad(() => import("../../../pages/private/company/users/ListCompanyUsers"));

const usuariosRoutes: RouteConfig = {
    path: "usuarios",
    children: [
        simpleRoute("list", List),
    ],
};

export default usuariosRoutes;
