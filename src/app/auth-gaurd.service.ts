import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authservice: AuthService, private router: Router) {
  };

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authservice.isauthenticated().then((authenticated: boolean) => {
      console.log(authenticated);
      if (authenticated) {
        return true;
      } else {
        this.router.navigate(['/not-found'])
      }
    });
  }
}
