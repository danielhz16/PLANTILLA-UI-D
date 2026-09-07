import type { ComponentType, ReactNode } from "react";

export interface RouteNode {
    name: string;
    route: string;
    component?: () => Promise<{ default: ComponentType }>;
    useLayout?: boolean;
    auth?: [string, number];
    isPublic?: boolean;
    menuRoute?: boolean;
    icon?: ReactNode;
    sub?: RouteNode[];
}

export interface MenuNode {
    name: string;
    path: string;
    icon?: ReactNode;
    children?: MenuNode[];
}

export interface CreateRouterConfig {
    routes: RouteNode[];
    layoutDefault: ComponentType;
    rootRedirect?: ComponentType;
    isAuthenticated?: boolean;
    loginComponent?: ComponentType;
    loginPath?: string;
    homePath?: string;
    notAuthorizedComponent?: ComponentType;
    notFoundComponent?: ComponentType;
    validatePermission?: (module: string, level: number) => boolean;
}

export interface UseMenuResult {
    menu: MenuNode[];
}
