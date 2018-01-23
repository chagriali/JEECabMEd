import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardSecretaryComponent } from './dashboard-secretary.component';
import {MedicalFileInputComponent} from "./medical-file-input/medical-file-input.component";
import {ReactiveFormsModule} from "@angular/forms";
import {SexService} from "../../services/sex.service";
import {PatientsListComponent} from "./patients-list/patients-list.component";
import {DetailPatientComponent} from "./detail-patient/detail-patient.component";
import {GestionRdvComponent} from "./gestion-rdv/gestion-rdv.component";
import {GestionCabinetComponent} from "./gestion-cabinet/gestion-cabinet.component";
import {ConnectSecretaryComponent} from "./auth-secretary/connect-secretary/connect-secretary.component";
import {AuthGardSecretaryService} from "../../services/auth/auth-gard-secretary.service";

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
        },
        canActivate:[AuthGardSecretaryService]
      },
      {
        path: 'patient-list',
        component: PatientsListComponent ,
        data: {
          title: 'Liste des patients'
        },
        canActivate:[AuthGardSecretaryService]
      },
      {

        path: 'patient-detail/:id',
        component: DetailPatientComponent ,
        data: {
          title: 'Détail du patient'
        },
        canActivate:[AuthGardSecretaryService]
      },
      {

        path: 'GestionRdv',
        component: GestionRdvComponent ,
        data: {
          title: 'Gestion des Rendez-vous'
        },
        canActivate:[AuthGardSecretaryService]
      },{

        path: 'GestionCabinet',
        component: GestionCabinetComponent ,
        data: {
          title: 'Gestion du Cabinet'
        },
        canActivate:[AuthGardSecretaryService]
      },{

        path: 'auth',
        component: ConnectSecretaryComponent ,
        data: {
          title: 'authentication'
        },

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
