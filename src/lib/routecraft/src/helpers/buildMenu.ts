import type { RouteNode, MenuNode } from "../types";

interface BuildMenuCtx {
    isLoggedIn: boolean;
    validarPermiso: (name: string, level: number) => boolean;
}

const hasAccess = (node: RouteNode, ctx: BuildMenuCtx): boolean => {
    if (node.isPublic) return true;
    if (!ctx.isLoggedIn) return false;
    if (!node.auth) return true;
    return ctx.validarPermiso(node.auth[0], node.auth[1]);
};

const createNodeEntry = (node: RouteNode, path: string, children: MenuNode[] | undefined): MenuNode => ({
    name: node.name,
    path,
    icon: node.icon,
    ...(children && children.length > 0 ? { children } : {}),
});

const addChildrenToResult = (result: MenuNode[], node: RouteNode, path: string, children: MenuNode[], depth: number): void => {
    if (depth === 0) {
        result.push(createNodeEntry(node, path, children));
    } else {
        result.push(...children);
    }
};

export const buildMenu = (nodes: RouteNode[], ctx: BuildMenuCtx, parentPath = "", depth = 0): MenuNode[] => {
    const result: MenuNode[] = [];

    for (const node of nodes) {
        const path = node.route ? `${parentPath}/${node.route}`.replace(/\/{2,}/g, "/") : parentPath;
        const children = node.sub ? buildMenu(node.sub, ctx, path, depth + 1) : undefined;
        const selfVisible = !!node.menuRoute && hasAccess(node, ctx);

        if (selfVisible) {
            result.push(createNodeEntry(node, path, children));
        } else if (children && children.length > 0) {
            addChildrenToResult(result, node, path, children, depth);
        }
    }

    return result;
};

export const buildMenuConfig = (
    routes: RouteNode[],
    isLoggedIn: boolean,
    validarPermiso?: (name: string, level: number) => boolean
): MenuNode[] => buildMenu(routes, { isLoggedIn, validarPermiso: validarPermiso || (() => true) });
