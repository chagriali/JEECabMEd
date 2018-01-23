import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {AuthSecretatyService} from "./auth-secretaty.service";
import {AuthPatientService} from "./auth-patient.service";


@Injectable()
export class AuthGardPatientService implements CanActivate{

  constructor(private authSecretary:AuthPatientService,private  router:Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.authSecretary.isAuthenticated()){
      return true;
    }else {
      this.router.navigate(['/patient/auth']);
      return false;
    }
  }

}
