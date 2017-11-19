import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { DashboardSecretaryComponent } from './dashboard-secretary.component';
import { DashboardRoutingModule } from './dashboard-secretary-routing.module';
import {MedicalFileInputComponent} from "./medical-file-input/medical-file-input.component";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {SexService} from "../../services/sex.service";
import {PatientService} from "../../services/patient.service";
import {DossierService} from "../../services/dossier.service";
import {DetailPatientComponent} from "./detail-patient/detail-patient.component";
import {PatientsListComponent} from "./patients-list/patients-list.component";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    ChartsModule
  ],
  declarations: [ DashboardSecretaryComponent,MedicalFileInputComponent,DetailPatientComponent,PatientsListComponent
  ],
  providers:[SexService,PatientService,DossierService]
})
export class DashboardSecretaryModule { }
