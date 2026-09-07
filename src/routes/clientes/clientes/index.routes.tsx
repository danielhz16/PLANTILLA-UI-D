import { lazyLoad, protectedRoute } from "../../routes.factory";
import type { RouteConfig } from "../../ts";
import { COMPANY } from "@/features/company";
import { TYPES_AUTHORIZATIONS } from "@/features/auth";

const { MODULE } = COMPANY;
const { Write, Read } = TYPES_AUTHORIZATIONS;

const List = lazyLoad(() => import("../../../pages/private/company/list/ListCompany"));
const Create = lazyLoad(() => import("../../../pages/private/company/details/Details"));

const clientesListRoutes: RouteConfig = {
    path: "",
    children: [
        protectedRoute("list", List, MODULE, Read),
        protectedRoute("crear", Create, MODULE, Write),
        protectedRoute("detalles/:id", Create, MODULE, Write),
    ],
};

export default clientesListRoutes;
