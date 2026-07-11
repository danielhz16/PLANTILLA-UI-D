import { lazyLoad, protectedRoute } from "../../routes.factory";
import type { RouteConfig } from "../../ts";
import { PERMISSIONS } from "@/common/const/permissions";
import { TYPES_AUTHORIZATIONS } from "@/common";

const { MODULE } = PERMISSIONS;
const { Write, Read } = TYPES_AUTHORIZATIONS;

const List = lazyLoad(() => import("../../../pages/private/access/permissions/list/ListPermissions"));
const Create = lazyLoad(() => import("../../../pages/private/access/permissions/details/PermissionsDetails"));

const permisosRoutes: RouteConfig = {
    path: "permisos",
    children: [
        protectedRoute("list", List, MODULE, Read),
        protectedRoute("create", Create, MODULE, Write),
        protectedRoute("details/:id", Create, MODULE, Write),
    ],
};

export default permisosRoutes;
