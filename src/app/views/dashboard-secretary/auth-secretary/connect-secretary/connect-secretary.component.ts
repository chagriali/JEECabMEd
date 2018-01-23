


import {Component} from "@angular/core";
import {AuthSecretatyService} from "../../../../services/auth/auth-secretaty.service";

@Component({
  selector:'connect-secretary',
  templateUrl:'connect-secretary.component.html'
})
export class ConnectSecretaryComponent{


  constructor(private authService:AuthSecretatyService){}

  onLogin(username,password) {
    this.authService.login(username,password)
  }
}
