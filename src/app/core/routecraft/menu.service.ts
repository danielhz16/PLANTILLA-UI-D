import { Injectable, computed } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStore } from '@core/auth/auth.store';
import { MenuNode, RouteNode } from '@routes/types';

interface BuildMenuContext {
  isLoggedIn: boolean;
  validatePermission: (name: string, level: number) => boolean;
}

function hasAccess(node: RouteNode, ctx: BuildMenuContext): boolean {
  if (node.isPublic) return true;
  if (!ctx.isLoggedIn) return false;
  if (!node.auth) return true;
  return ctx.validatePermission(node.auth[0], node.auth[1]);
}

function createNodeEntry(node: RouteNode, path: string, children: MenuNode[] | undefined): MenuNode {
  return {
    name: node.name,
    path,
    icon: node.icon,
    ...(children && children.length > 0 ? { children } : {}),
  };
}

function buildMenu(
  nodes: RouteNode[],
  ctx: BuildMenuContext,
  parentPath = '',
  depth = 0,
): MenuNode[] {
  const result: MenuNode[] = [];

  for (const node of nodes) {
    const path = node.route
      ? `${parentPath}/${node.route}`.replace(/\/{2,}/g, '/')
      : parentPath;
    const children = node.sub ? buildMenu(node.sub, ctx, path, depth + 1) : undefined;
    const selfVisible = !!node.menuRoute && hasAccess(node, ctx);

    if (selfVisible) {
      result.push(createNodeEntry(node, path, children));
    } else if (children && children.length > 0) {
      if (depth === 0) {
        result.push(createNodeEntry(node, path, children));
      } else {
        result.push(...children);
      }
    }
  }

  return result;
}

@Injectable({ providedIn: 'root' })
export class MenuService {
  routes: RouteNode[] = [];

  constructor(
    private router: Router,
    private auth: AuthStore,
  ) {}

  setRoutes(routes: RouteNode[]): void {
    this.routes = routes;
  }

  readonly menu = computed<MenuNode[]>(() => {
    const isLoggedIn = this.auth.isAuthenticated();
    return buildMenu(this.routes, {
      isLoggedIn,
      validatePermission: (name, level) => this.auth.validatePermission(name, level),
    });
  });

  isActive(path: string, exact = false): boolean {
    const url = this.router.url.split('?')[0];
    if (exact) return url === path;
    return url.startsWith(path);
  }

  titleForUrl(url: string): string {
    const clean = url.split('?')[0].replace(/\/+$/, '');
    if (!clean || clean === '/') return 'Dashboard';

    let bestLen = -1;
    let bestName = '';

    const walk = (nodes: RouteNode[], parent: string): void => {
      for (const node of nodes) {
        const path = node.route ? `${parent}/${node.route}`.replace(/\/{2,}/g, '/') : parent;
        if (path && (clean === path || clean.startsWith(path + '/'))) {
          if (path.length > bestLen) {
            bestLen = path.length;
            bestName = node.name;
          }
        }
        if (node.sub && node.sub.length > 0) walk(node.sub, path);
      }
    };

    walk(this.routes, '');
    if (bestName) return bestName;

    const segments = clean.split('/').filter(Boolean);
    while (segments.length > 0) {
      const seg = segments.pop();
      if (seg && seg !== 'list') return seg.charAt(0).toUpperCase() + seg.slice(1);
    }
    return '';
  }
}