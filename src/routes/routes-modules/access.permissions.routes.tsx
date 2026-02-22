import Loadable from "../../common/components/loading/Lazy";
import { lazy } from "react";
import type { Routes } from "../ts";
import MainLayout from "@/components/layout/MainLayout";

const CreatePermissions = Loadable(lazy(() => import("../../pages/private/access/permissions/details/PermissionsDetails")));
const ListPermissions = Loadable(lazy(() => import("../../pages/private/access/permissions/list/ListPermissions")));

const authRoutes: Routes = {
    path: "/permissions",
    element: <MainLayout />,
    children: [
        {
          path: 'list',
          element: <ListPermissions />  
        },
        {
            path: "create",
            element: <CreatePermissions />
        },
        {
          path: 'details/:id',
          element: <CreatePermissions />
        }
    ]
};

export default authRoutes