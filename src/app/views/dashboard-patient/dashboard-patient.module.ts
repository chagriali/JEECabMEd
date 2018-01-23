import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { DashboardPatientComponent} from './dashboard-patient.component';
import { DashboardPatientRoutingModule } from './dashboard-patient-routing.module';
import {CommonModule} from "@angular/common";
import {NewRdvComponent} from "./new-rdv/new-rdv.component";
import {CalendarModule} from "angular-calendar";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CabinetComponent} from "./cabinet/cabinet.component";
import {DocteurService} from "../../services/docteur.service";
import {RendezvousService} from "../../services/rendezvous.service";
import {ConnectPatientComponent} from "./auth-patient/connect-patient.component";
import {AuthPatientService} from "../../services/auth/auth-patient.service";
import {AuthGardPatientService} from "../../services/auth/auth-gard-patient.service";
import {BsDropdownModule, TabsModule} from "ngx-bootstrap";
import {Ng2TableModule} from "ng2-table";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {DossierService} from "../../services/dossier.service";
import {FormsModule} from "@angular/forms";
import {DateTimePickerModule} from "ng-pick-datetime";
import {ConsultationDistComponent} from "./consultation-dist/consultation-dist.component";
import {ConsultationDistService} from "../../services/consultation-dist.service";

@NgModule({
  imports: [
    CommonModule,
    DashboardPatientRoutingModule,
    ChartsModule,
    CalendarModule.forRoot(),
    TabsModule,
    NgbModule,
    Ng2TableModule,
    BsDropdownModule.forRoot(),
    FormsModule,
    DateTimePickerModule,

  ],
  declarations: [ DashboardPatientComponent,NewRdvComponent,CabinetComponent,ConnectPatientComponent,ConsultationDistComponent ],
  providers:[DocteurService,RendezvousService,AuthPatientService,AuthGardPatientService,DossierService,ConsultationDistService]
})
export class DashboardPatientModule { }
