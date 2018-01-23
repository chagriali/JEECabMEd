import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AuthSecretatyService} from "../../services/auth/auth-secretaty.service";

@Component({
  templateUrl: 'dashboard-secretary.component.html'
})
export class DashboardSecretaryComponent {

  constructor(private authService:AuthSecretatyService) { }

}
