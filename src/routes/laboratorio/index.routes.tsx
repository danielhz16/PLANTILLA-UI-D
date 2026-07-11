import { lazyLoad, privateRoute } from "../routes.factory";
import type { RouteConfig } from "../ts";
import MainLayout from "@/components/layout/MainLayout";

const Laboratory = lazyLoad(() => import("../../pages/private/laboratory/Laboratory"));

const laboratorioRoutes: RouteConfig = {
    path: "/laboratorio",
    element: <MainLayout />,
    children: [
        privateRoute("", Laboratory),
    ],
};

export default laboratorioRoutes;
