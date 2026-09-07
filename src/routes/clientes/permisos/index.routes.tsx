import { lazyLoad, simpleRoute } from "../../routes.factory";
import type { RouteConfig } from "../../ts";

const List = lazyLoad(() => import("../../../pages/private/company/permissions/ListCompanyPermissions"));

const permisosRoutes: RouteConfig = {
    path: "permisos",
    children: [
        simpleRoute("list", List),
    ],
};

export default permisosRoutes;
