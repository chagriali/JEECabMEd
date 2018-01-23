import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import {
  FullLayoutComponent,
  SimpleLayoutComponent
} from './containers';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      }
      ,
      {
        path: 'doctor',
        loadChildren: './views/dashboard-doctor/dashboard-doctor.module#DashboardDoctorModule'
      }
      ,
      {
        path: 'secretary',
        loadChildren: './views/dashboard-secretary/dashboard-secretary.module#DashboardSecretaryModule'
      },
      {
        path: 'patient',
        loadChildren: './views/dashboard-patient/dashboard-patient.module#DashboardPatientModule'
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
