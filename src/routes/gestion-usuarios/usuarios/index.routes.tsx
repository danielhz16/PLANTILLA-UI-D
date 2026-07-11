import { lazyLoad, protectedRoute } from "../../routes.factory";
import type { RouteConfig } from "../../ts";
import { USERS } from "@/common/const/permissions";
import { TYPES_AUTHORIZATIONS } from "@/common";

const { MODULE } = USERS;
const { Write, Read } = TYPES_AUTHORIZATIONS;

const List = lazyLoad(() => import("../../../pages/private/auth/List"));
const Create = lazyLoad(() => import("../../../pages/private/auth/Details"));

const usuariosRoutes: RouteConfig = {
    path: "usuarios",
    children: [
        protectedRoute("list", List, MODULE, Read),
        protectedRoute("create", Create, MODULE, Write),
        protectedRoute("details/:id", Create, MODULE, Write),
    ],
};

export default usuariosRoutes;
