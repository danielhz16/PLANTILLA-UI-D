import { lazyLoad, privateRoute } from "../routes.factory";
import type { RouteConfig } from "../ts";
import MainLayout from "@/app/layout/MainLayout";

const Clinic = lazyLoad(() => import("../../pages/private/clinic/Clinic"));

const clinicaRoutes: RouteConfig = {
    path: "/clinica",
    element: <MainLayout />,
    children: [
        privateRoute("", Clinic),
    ],
};

export default clinicaRoutes;
