import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { DashboardDoctorComponent } from './dashboard-doctor.component';
import { DashboardRoutingModule } from './dashboard-doctor-routing.module';
import {DoctorPatientsListComponent} from "./patients-list/patients-list.component";
import {DossierService} from "../../services/dossier.service";
import {PatientService} from "../../services/patient.service";
import {SexService} from "../../services/sex.service";
import {CommonModule} from "@angular/common";
import {DoctorDetailPatientComponent} from "./detail-patient/detail-patient.component";
import {ConsultationsListComponent} from "./consultations-list/consultations-list.component";
import {ConsultationsService} from "../../services/consultations.service";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {TabsModule} from "ngx-bootstrap";

@NgModule({
  imports: [
    DashboardRoutingModule,
    ChartsModule,
    CommonModule,
    DashboardRoutingModule,
    NgbModule,
    TabsModule
  ],
  declarations: [ DashboardDoctorComponent ,DoctorPatientsListComponent , DoctorDetailPatientComponent , ConsultationsListComponent],
  providers:[SexService,PatientService,DossierService,ConsultationsService]
})
export class DashboardDoctorModule { }
