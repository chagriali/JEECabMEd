import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {AuthSecretatyService} from "./auth-secretaty.service";


@Injectable()
export class AuthGardSecretaryService implements CanActivate{

  constructor(private authSecretary:AuthSecretatyService,private  router:Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.authSecretary.isAuthenticated()){
      return true;
    }else {
      this.router.navigate(['/secretary/auth']);
      return false;
    }
  }

}
