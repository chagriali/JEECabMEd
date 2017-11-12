import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { DashboardDoctorComponent } from './dashboard-doctor.component';
import { DashboardRoutingModule } from './dashboard-doctor-routing.module';

@NgModule({
  imports: [
    DashboardRoutingModule,
    ChartsModule
  ],
  declarations: [ DashboardDoctorComponent ]
})
export class DashboardDoctorModule { }
