import Loadable from "../../common/components/loading/Lazy";
import { lazy } from "react";
import type { Routes } from "../ts";
import MainLayout from "@/components/layout/MainLayout";
import { Protector } from "../protector/Protector";
import { TYPES_AUTHORIZATIONS } from "@/common";
import { PERMISSIONS } from "@/common/const/permissions";

const { MODULE } = PERMISSIONS;
const { WRITE, READ } = TYPES_AUTHORIZATIONS;

const CreatePermissions = Loadable(lazy(() => import("../../pages/private/access/permissions/details/PermissionsDetails")));
const ListPermissions = Loadable(lazy(() => import("../../pages/private/access/permissions/list/ListPermissions")));

const authRoutes: Routes = {
    path: "/permissions",
    element: <MainLayout />,
    children: [
        {
          path: 'list',
          element: <Protector name={MODULE} level={READ} children={<ListPermissions />} />
        },
        {
            path: "create",
            element: <Protector name={MODULE} level={WRITE} children={<CreatePermissions />} />
        },
        {
          path: 'details/:id',
          element: <Protector name={MODULE} level={WRITE} children={<CreatePermissions />} />
        }
    ]
};

export default authRoutes