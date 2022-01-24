import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { UsersPartComponent } from './users-part/users-part.component';
import { RdvsPartComponent } from './rdvs-part/rdvs-part.component';


@NgModule({
  declarations: [
    DashboardComponent,
    UsersPartComponent,
    RdvsPartComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
