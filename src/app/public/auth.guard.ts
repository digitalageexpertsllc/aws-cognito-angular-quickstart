import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { UserLoginService } from './public/services/user-login.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
    private userLogin: UserLoginService
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.userLogin.isAuthenticatedObservable().pipe(
      tap(x => {
        if (!x) {
          console.warn('AuthGuard.canActivate: User is not authorized at ' + next.url);
          this.router.navigate(['']);
        }
      })
    );
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.userLogin.isAuthenticatedObservable().pipe(
      tap(x => {
        if (!x) {
          console.warn('Authguard denies access ' + next.url);
          this.router.navigate(['']);
        }
      })
    );
  }

}
