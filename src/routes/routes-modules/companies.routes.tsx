import Loadable from "../../common/components/loading/Lazy";
import { lazy } from "react";
import type { Routes } from "../ts";
import MainLayout from "../../common/components/layout/MainLayout";

const List = Loadable(lazy(() => import("../../pages/private/company/list/ListCompany")));
const Details = Loadable(lazy(() => import("../../pages/private/company/details/Details")));

const companyRoutes: Routes = {
    path: "/company",
    element: <MainLayout />,
    children: [
        {
            path: "",
            element: <List />
        },
        {
            path: "create",
            element: <Details />
        },
        {
            path: "details/:id",
            element: <Details />
        }
    ]
};

export default companyRoutes;