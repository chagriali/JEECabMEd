


import {Component} from "@angular/core";
import {AuthPatientService} from "../../../services/auth/auth-patient.service";


@Component({
  selector:'connect-patient',
  templateUrl:'connect-patient.component.html'
})
export class ConnectPatientComponent {


  constructor(private authService:AuthPatientService){}

  onLogin(username,password) {
    console.log("iuiu");
    this.authService.login(username,password)
  }
}
