import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthStore } from '@core/auth/auth.store';

@Injectable({ providedIn: 'root' })
export class PermissionGuard implements CanActivate {
  constructor(
    private auth: AuthStore,
    private router: Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): boolean | UrlTree {
    const required = route.data['permission'] as string | undefined;
    const level = (route.data['level'] as number | undefined) ?? 1;
    if (!required) return true;
    if (this.auth.validatePermission(required, level)) return true;
    return this.router.parseUrl('/unauthorized');
  }
}