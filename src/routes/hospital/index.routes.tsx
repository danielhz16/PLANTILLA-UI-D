import { lazyLoad, privateRoute } from "../routes.factory";
import type { RouteConfig } from "../ts";
import MainLayout from "@/components/layout/MainLayout";

const Hospital = lazyLoad(() => import("../../pages/private/hospital/Hospital"));

const hospitalRoutes: RouteConfig = {
    path: "/hospital",
    element: <MainLayout />,
    children: [
        privateRoute("", Hospital),
    ],
};

export default hospitalRoutes;
