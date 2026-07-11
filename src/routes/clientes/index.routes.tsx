import { lazyLoad, simpleRoute } from "../routes.factory";
import type { RouteConfig } from "../ts";
import MainLayout from "@/components/layout/MainLayout";

const List = lazyLoad(() => import("../../pages/private/company/list/ListCompany"));
const Create = lazyLoad(() => import("../../pages/private/company/details/Details"));

const clientesRoutes: RouteConfig = {
    path: "/clientes",
    element: <MainLayout />,
    children: [
        simpleRoute("", List),
        simpleRoute("create", Create),
        simpleRoute("details/:id", Create),
    ],
};

export default clientesRoutes;
