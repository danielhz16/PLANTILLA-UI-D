import { lazyLoad, simpleRoute } from "../../routes.factory";
import type { RouteConfig } from "../../ts";

const List = lazyLoad(() => import("../../../pages/private/company/roles/ListCompanyRoles"));

const rolesRoutes: RouteConfig = {
    path: "roles",
    children: [
        simpleRoute("list", List),
    ],
};

export default rolesRoutes;
