import Loadable from "../../common/components/loading/Lazy";
import { lazy } from "react";
import type { Routes } from "../ts";
import MainLayout from "../../common/components/layout/MainLayout";

const ListUsers = Loadable(lazy(() => import("../../pages/private/auth/List")));
const CreateUser = Loadable(lazy(() => import("../../pages/private/auth/Details")));

const userRoutes: Routes = {
    path: "/user",
    element: <MainLayout />,
    children: [
        {
            path: "list",
            element: <ListUsers />
        },
        {
            path: "create",
            element: <CreateUser />
        },
        {
            path: "details/:id",
            element: <CreateUser />
        }
    ]
};

export default userRoutes