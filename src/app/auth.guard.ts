import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const attemptingLoginOrReg =
      state.url === '/login' || state.url === '/registration';

    console.log('AuthGuard check:', {
      isLoggedIn,
      url: state.url,
    });

    if (!isLoggedIn && attemptingLoginOrReg) {
      return true;
    }
    if (!isLoggedIn && !attemptingLoginOrReg) {
      return this.router.createUrlTree(['/login']);
    }
    if (isLoggedIn && attemptingLoginOrReg) {
      return this.router.createUrlTree(['/home']);
    }
    return true;
  }
}
