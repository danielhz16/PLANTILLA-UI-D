import { lazyLoad, simpleRoute } from "../../routes.factory";
import type { RouteConfig } from "../../ts";

const List = lazyLoad(() => import("../../../pages/private/access/roles/list/ListoRoles"));
const Create = lazyLoad(() => import("../../../pages/private/access/roles/details/DetailsRoles"));

const rolesRoutes: RouteConfig = {
    path: "roles",
    children: [
        simpleRoute("list", List),
        simpleRoute("create", Create),
        simpleRoute("details/:id", Create),
    ],
};

export default rolesRoutes;
