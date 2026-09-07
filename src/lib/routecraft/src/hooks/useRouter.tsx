import { lazy, useMemo, type ComponentType, type ReactNode } from "react";
import { createBrowserRouter, Navigate, Outlet, RouterProvider as RRDRouterProvider } from "react-router";
import Loadable from "@/components/loading/Lazy";
import type { RouteNode, CreateRouterConfig } from "../types";
import { RouteGuard } from "../components/RouteGuard";
import { DefaultNotAuthorized, DefaultNotFound, DefaultRootRedirect } from "../components/defaults";
import { buildMenuConfig } from "../helpers/buildMenu";
import { RouterCtx } from "./useMenu";

const lazyLoad = (importFn: () => Promise<{ default: ComponentType }>) =>
    Loadable(lazy(importFn));

const buildRouteConfigs = (
    nodes: RouteNode[],
    opts: {
        layoutDefault: ComponentType<{ children?: ReactNode }>;
        fnPermissionValidate?: (module: string, level: number) => boolean;
        isAuthenticated: boolean;
    }
): any[] => nodes.map((node) => {
    const Component = node.component ? lazyLoad(node.component) : undefined;
    const hasChildren = !!(node.sub && node.sub.length > 0);

    return {
        path: node.route,
        ...(node.useLayout && { element: <opts.layoutDefault /> }),
        ...(!node.useLayout && Component && {
            element: (
                <RouteGuard isPublic={node.isPublic} auth={node.auth} isAuthenticated={opts.isAuthenticated} fnValidate={opts.fnPermissionValidate}>
                    <Component />
                </RouteGuard>
            ),
        }),
        ...(!node.useLayout && !Component && hasChildren && {
            element: <Outlet />,
        }),
        ...(node.sub && { children: buildRouteConfigs(node.sub, opts) }),
    };
});

const useRouterConfig = (
    routes: RouteNode[],
    isAuthenticated: boolean,
    validatePermission: ((module: string, level: number) => boolean) | undefined,
    layoutDefault: ComponentType<{ children?: ReactNode }>
) => useMemo(
    () => buildRouteConfigs(routes, { layoutDefault, fnPermissionValidate: validatePermission, isAuthenticated }),
    [isAuthenticated, validatePermission]
);

const useMenuBuilder = (
    routes: RouteNode[],
    isAuthenticated: boolean,
    validatePermission: ((module: string, level: number) => boolean) | undefined
) => useMemo(
    () => buildMenuConfig(routes, isAuthenticated, validatePermission),
    [isAuthenticated, validatePermission]
);

export const createRouter = (config: CreateRouterConfig) => {
    const {
        routes,
        layoutDefault,
        rootRedirect: RootRedirect,
        isAuthenticated = false,
        loginPath = "/auth/login",
        homePath = "/dashboard",
        loginComponent: LoginComponent,
        notAuthorizedComponent: NotAuthorized = DefaultNotAuthorized,
        notFoundComponent: NotFound = DefaultNotFound,
        validatePermission,
    } = config;

    const Router = () => {
        const menu = useMenuBuilder(routes, isAuthenticated, validatePermission);
        const routeConfigs = useRouterConfig(routes, isAuthenticated, validatePermission, layoutDefault);

        const router = useMemo(
            () => createBrowserRouter([
                { path: "/", element: RootRedirect ? <RootRedirect /> : <DefaultRootRedirect isAuthenticated={isAuthenticated} homePath={homePath} loginPath={loginPath} /> },
                ...routeConfigs,
                { path: "/unauthorized", element: <NotAuthorized /> },
                { path: "/login", element: LoginComponent ? <LoginComponent /> : <Navigate to={loginPath} replace /> },
                { path: "*", element: <NotFound /> },
            ]),
            [routeConfigs, isAuthenticated]
        );

        const ctxValue = useMemo(() => ({ menu }), [menu]);

        return (
            <RouterCtx.Provider value={ctxValue}>
                <RRDRouterProvider router={router} />
            </RouterCtx.Provider>
        );
    };

    return Router;
};
