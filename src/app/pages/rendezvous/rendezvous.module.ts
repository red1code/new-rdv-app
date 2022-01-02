import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { RendezvousRoutingModule } from './rendezvous-routing.module';
import { RendezvousComponent } from './rendezvous.component';
import { MyRendezvousComponent } from './my-rendezvous/my-rendezvous.component';
import { DataTablesModule } from 'angular-datatables';
import { TableComponent } from './table/table.component';

@NgModule({
  declarations: [
    RendezvousComponent,
    MyRendezvousComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    RendezvousRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule
  ]
})
export class RendezvousModule { }
