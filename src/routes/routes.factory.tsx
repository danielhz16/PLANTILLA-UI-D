import { lazy, type ComponentType } from "react";
import Loadable from "@/components/loading/Lazy";
import type { RouteConfig } from "./ts";
import { PrivateRoute } from "./protector/PrivateRoute";
import { PublicRoute } from "./protector/PublicRoute";
import { Protector } from "./protector/Protector";
import { type TypeAuth } from "@/common";

export const lazyLoad = (importFn: () => Promise<{ default: ComponentType }>) =>
    Loadable(lazy(importFn));

export const simpleRoute = (path: string, Component: ComponentType): RouteConfig => ({
    path,
    element: <Component />,
});

export const privateRoute = (path: string, Component: ComponentType): RouteConfig => ({
    path,
    element: <PrivateRoute><Component /></PrivateRoute>,
});

export const publicRoute = (path: string, Component: ComponentType): RouteConfig => ({
    path,
    element: <PublicRoute><Component /></PublicRoute>,
});

export const protectedRoute = (path: string, Component: ComponentType, name: string, level: TypeAuth): RouteConfig => ({
    path,
    element: <Protector name={name} level={level}><Component /></Protector>,
});
