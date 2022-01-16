import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {TokenStorageService} from '../service/token-storage.service';

/*
AuthGuard TanTN
 */
@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {
  constructor(private router: Router,
              private tokenStorageService: TokenStorageService) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url: string = state.url;
    const currentUser = this.tokenStorageService.getUser();
    if (currentUser !== null) {
      const role = currentUser.roles[1];
      if (route.data.expectedRole.indexOf(role) !== 0) {
        this.router.navigate(['/home']);
        return false;
      }
      return true;
    }
    this.router.navigate(['/auth/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }
}
