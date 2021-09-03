import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardLoggedService implements CanActivate {

  canActivate(
    route:ActivatedRouteSnapshot,
    router:RouterStateSnapshot
  ): boolean | Promise<boolean> | Observable<boolean | UrlTree>{
    return this.auth.user
    .pipe(
      map( user => {
        const isAuth = !user ? false : true;

        if (!isAuth){
          return true;
        }

        return this.router.createUrlTree(['/main']);
      })
    )
  }

  constructor(private auth: AuthService, private router: Router) { }

}
