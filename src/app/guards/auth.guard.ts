import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map} from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean |
    UrlTree{
      return this.authService.manager$.pipe(
        take(1),
        map((user) => {
          if (user) {
            // console.log('Guard da ->', user);
            return true;
          } else {
            this.router.navigate(['/login']);
            // console.log('Guard no da ->', user);
            return false;
          }
      })
    );
  }
}
