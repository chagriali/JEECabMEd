import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {AuthDoctorService} from "./auth-doctor.service";


@Injectable()
export class AuthGardDoctorService implements CanActivate{

  constructor(private authSecretary:AuthDoctorService,private  router:Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.authSecretary.isAuthenticated()){
      return true;
    }else {
      this.router.navigate(['/doctor/auth']);
      return false;
    }
  }

}
