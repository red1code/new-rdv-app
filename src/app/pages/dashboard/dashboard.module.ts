import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { UsersPartComponent } from './users-part/users-part.component';
import { PendingRendezvousComponent } from './pending-rendezvous/pending-rendezvous.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ApprovedRendezvousComponent } from './approved-rendezvous/approved-rendezvous.component';


@NgModule({
  declarations: [
    DashboardComponent,
    UsersPartComponent,
    PendingRendezvousComponent,
    ApprovedRendezvousComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class DashboardModule { }
