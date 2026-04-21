import Loadable from "../../common/components/loading/Lazy";
import { lazy } from "react";
import type { Routes } from "../ts";
import MainLayout from "@/components/layout/MainLayout";

const ListRoles = Loadable(lazy(() => import("../../pages/private/access/roles/list/ListoRoles")));
const DetailsRoles = Loadable(lazy(() => import("../../pages/private/access/roles/details/DetailsRoles")));

const rolesRoutes: Routes = {
    path: "/roles",
    element: <MainLayout />,
    children: [
        {
            path: "list",
            element: <ListRoles />
        },
        {
            path: "create",
            element: <DetailsRoles />
        },
        {
            path: "details/:id",
            element: <DetailsRoles />
        }
    ]
};

export default rolesRoutes;
