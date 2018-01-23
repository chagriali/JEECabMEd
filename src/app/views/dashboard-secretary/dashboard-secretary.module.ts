import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { DashboardSecretaryComponent } from './dashboard-secretary.component';
import { DashboardRoutingModule } from './dashboard-secretary-routing.module';
import {MedicalFileInputComponent} from "./medical-file-input/medical-file-input.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {SexService} from "../../services/sex.service";
import {PatientService} from "../../services/patient.service";
import {DossierService} from "../../services/dossier.service";
import {DetailPatientComponent} from "./detail-patient/detail-patient.component";
import {PatientsListComponent} from "./patients-list/patients-list.component";
import {ReportingService} from "../../services/reporting.service";
import {GestionRdvComponent} from "./gestion-rdv/gestion-rdv.component";
import {CalendarModule} from "angular-calendar";
import {RendezvousService} from "../../services/rendezvous.service";
import {DocteurService} from "../../services/docteur.service";
import {BsDropdownModule, TabsModule} from "ngx-bootstrap";
import {SortableModule} from "ngx-bootstrap/sortable";
import {Ng2TableModule} from "ng2-table";
import {DateTimePickerModule} from "ng-pick-datetime";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {GestionCabinetComponent} from "./gestion-cabinet/gestion-cabinet.component";
import {ConnectSecretaryComponent} from "./auth-secretary/connect-secretary/connect-secretary.component";
import {AuthSecretatyService} from "../../services/auth/auth-secretaty.service";
import {AuthGardSecretaryService} from "../../services/auth/auth-gard-secretary.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    ChartsModule,
    CalendarModule.forRoot(),
    TabsModule,
    Ng2TableModule,
    DateTimePickerModule,
    SortableModule.forRoot(),
    BsDropdownModule.forRoot()

  ],
  declarations: [ DashboardSecretaryComponent,MedicalFileInputComponent,DetailPatientComponent,PatientsListComponent,GestionRdvComponent,GestionCabinetComponent
  ,ConnectSecretaryComponent],
  providers:[SexService,PatientService,DossierService,RendezvousService,DocteurService,AuthSecretatyService,AuthGardSecretaryService]
})
export class DashboardSecretaryModule { }
