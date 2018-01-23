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
import {BsDropdownModule, TabsModule} from "ngx-bootstrap";
import {ConsultationEditComponent} from "./consultation-edit/consultation-edit.component";
import {SymptomeService} from "../../services/symptome.service";
import {ReactiveFormsModule} from "@angular/forms";
import {MedicamentService} from "../../services/medicament.service";
import {ReportingService} from "../../services/reporting.service";
import {PdfTestComponent} from "./pdf-test/pdf-test.component";
import {MaladieService} from "../../services/maladie.service";
import {Ng2TableModule} from "ng2-table";
import {ConnectDoctorComponent} from "./auth-doctor/connect-doctor/connect-doctor.component";
import {AuthDoctorService} from "../../services/auth/auth-doctor.service";
import {AuthGardDoctorService} from "../../services/auth/auth-gard-doctor.service";
import {ConsultationDistService} from "../../services/consultation-dist.service";
import {ConsultationDistComponent} from "../dashboard-patient/consultation-dist/consultation-dist.component";
import {ConsDoctorComponent} from "./cons-doctor/cons-doctor.component";

@NgModule({
  imports: [
    DashboardRoutingModule,
    ChartsModule,
    CommonModule,
    DashboardRoutingModule,
    BsDropdownModule,
    NgbModule,
    TabsModule,
    ReactiveFormsModule,
    Ng2TableModule,


  ],
  declarations: [ DashboardDoctorComponent ,DoctorPatientsListComponent , DoctorDetailPatientComponent , ConsultationsListComponent,ConsultationEditComponent,PdfTestComponent,ConnectDoctorComponent,ConsDoctorComponent],
  providers:[SexService,PatientService,DossierService,ConsultationsService,SymptomeService,MedicamentService,MaladieService,ReportingService,AuthDoctorService,AuthGardDoctorService,ConsultationDistService]
})
export class DashboardDoctorModule { }
