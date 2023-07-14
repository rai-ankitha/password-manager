import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

export class AuthGuard implements CanActivate{
  constructor(private auth:AuthService,private router:Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.auth.isLoggedIn()){
      this.router.navigate(['home'])
      return true;
     
    }
    this.router.navigate(['login'])
    return false;
  }

}
