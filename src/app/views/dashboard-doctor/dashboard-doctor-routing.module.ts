import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardDoctorComponent } from './dashboard-doctor.component';
import {DoctorPatientsListComponent,} from "./patients-list/patients-list.component";
import {DoctorDetailPatientComponent} from "./detail-patient/detail-patient.component";
import {ConsultationsListComponent} from "./consultations-list/consultations-list.component";
import {ConsultationEditComponent} from "./consultation-edit/consultation-edit.component";
import {ConnectDoctorComponent} from "./auth-doctor/connect-doctor/connect-doctor.component";
import {AuthGardDoctorService} from "../../services/auth/auth-gard-doctor.service";
import {ConsultationDistComponent} from "../dashboard-patient/consultation-dist/consultation-dist.component";
import {ConsDoctorComponent} from "./cons-doctor/cons-doctor.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardDoctorComponent,
    data: {
      title: 'Dashboard'
    },
    children : [
      {
        path: 'patient-list',
        component: DoctorPatientsListComponent ,
        data: {
          title: 'Liste des patients'
        },
        canActivate:[AuthGardDoctorService]
      },
      {

        path: 'patient-detail/:id',
        component: DoctorDetailPatientComponent ,
        data: {
          title: 'Détail du patient'
        },
        canActivate:[AuthGardDoctorService]
      },
      {

        path: 'consultations/:id',
        component: ConsultationsListComponent ,
        data: {
          title: 'Liste des Consultations'
        },
        canActivate:[AuthGardDoctorService]
      },
      {

        path: 'patient-detail/:id/consultation/:idConsultation',
        component: ConsultationEditComponent ,
        data: {
          title: 'Edit consultation'
        },
        canActivate:[AuthGardDoctorService]
      },
      {

        path: 'consult',
        component: ConsDoctorComponent,
        data: {
          title: 'Mes consultations'
        },
        canActivate:[AuthGardDoctorService]
      },{

        path: 'auth',
        component: ConnectDoctorComponent ,
        data: {
          title: 'authentication'
        },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
