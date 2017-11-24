import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardDoctorComponent } from './dashboard-doctor.component';
import {DoctorPatientsListComponent,} from "./patients-list/patients-list.component";
import {DoctorDetailPatientComponent} from "./detail-patient/detail-patient.component";
import {ConsultationsListComponent} from "./consultations-list/consultations-list.component";
import {ConsultationEditComponent} from "./consultation-edit/consultation-edit.component";

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
        }
      },
      {

        path: 'patient-detail/:id',
        component: DoctorDetailPatientComponent ,
        data: {
          title: 'Détail du patient'
        }
      },
      {

        path: 'consultations/:id',
        component: ConsultationsListComponent ,
        data: {
          title: 'Liste des Consultations'
        }
      },
      {

        path: 'patient-detail/:id/consultation/:id',
        component: ConsultationEditComponent ,
        data: {
          title: 'Edit consultation'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
