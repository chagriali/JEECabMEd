import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPatientComponent } from './dashboard-patient.component';
import {NewRdvComponent} from "./new-rdv/new-rdv.component";
import {CabinetComponent} from "./cabinet/cabinet.component";
import {ConnectPatientComponent} from "./auth-patient/connect-patient.component";
import {AuthGardPatientService} from "../../services/auth/auth-gard-patient.service";
import {ConsultationDistComponent} from "./consultation-dist/consultation-dist.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardPatientComponent,
    data: {
      title: 'Dashboard'
    },
    children : [
      {
        path: 'addRdv',
        component: NewRdvComponent ,
        data: {
          title: 'Ajout Rdv'
        },
        canActivate:[AuthGardPatientService]
      },
      {
        path: 'VoirCabinet',
        component: CabinetComponent ,
        data: {
          title: 'Voir Cabinet'
        },
        canActivate:[AuthGardPatientService]
      },
      {
        path: 'consultation',
        component: ConsultationDistComponent ,
        data: {
          title: 'consultation'
        },
        canActivate:[AuthGardPatientService]
      },
      {
        path: 'auth',
        component: ConnectPatientComponent ,
        data: {
          title: 'authentication'
        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardPatientRoutingModule {}
