import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {LoginService} from "./login.service";

@Injectable()
export class AuthGardService implements CanActivate {

  constructor(private router: Router, private loginService: LoginService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.loginService.isLoggedIn()) {
      this.router.navigate(['login', { needsLogin: true }]);
    }
    return true;
  }

}
