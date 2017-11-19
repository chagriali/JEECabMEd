import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardSecretaryComponent } from './dashboard-secretary.component';
import {MedicalFileInputComponent} from "./medical-file-input/medical-file-input.component";
import {ReactiveFormsModule} from "@angular/forms";
import {SexService} from "../../services/sex.service";
import {PatientsListComponent} from "./patients-list/patients-list.component";
import {DetailPatientComponent} from "./detail-patient/detail-patient.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardSecretaryComponent,
    data: {
      title: 'Secretary'
    }
    ,
    children : [
      {
        path: 'add-new-medical-file',
        component: MedicalFileInputComponent ,
        data: {
            title: 'Ajouter nouveau patient'
        }
      },
      {
        path: 'patient-list',
        component: PatientsListComponent ,
        data: {
          title: 'Liste des patients'
        }
      },
      {

        path: 'patient-detail/:id',
        component: DetailPatientComponent ,
        data: {
          title: 'Détail du patient'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes )],
  exports: [RouterModule],
  providers:[]
})
export class DashboardRoutingModule {}
