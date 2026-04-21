import Loadable from "../../common/components/loading/Lazy";
import { lazy } from "react";
import type { Routes } from "../ts";
import MainLayout from "../../common/components/layout/MainLayout";
import { Protector } from "../protector/Protector";
import { TYPES_AUTHORIZATIONS } from "@/common";
import { USERS } from "@/common/const/permissions";

const { MODULE } = USERS;
const { WRITE, READ } = TYPES_AUTHORIZATIONS;

const ListUsers = Loadable(lazy(() => import("../../pages/private/auth/List")));
const CreateUser = Loadable(lazy(() => import("../../pages/private/auth/Details")));

const userRoutes: Routes = {
    path: "/user",
    element: <MainLayout />,
    children: [
        {
            path: "list",
            element: <Protector name={MODULE} level={READ} children={<ListUsers />} />
        },
        {
            path: "create",
            element: <Protector name={MODULE} level={WRITE} children={<CreateUser />} />
        },
        {
            path: "details/:id",
            element: <Protector name={MODULE} level={WRITE} children={<CreateUser />} />
        }
    ]
};

export default userRoutes