import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthStore } from '@core/auth/auth.store';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private auth: AuthStore,
    private router: Router,
  ) {}

  canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): boolean | UrlTree {
    return this.auth.isAuthenticated() ? true : this.router.createUrlTree(['/auth/login']);
  }

  canActivateChild(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): boolean | UrlTree {
    return this.auth.isAuthenticated() ? true : this.router.createUrlTree(['/auth/login']);
  }
}