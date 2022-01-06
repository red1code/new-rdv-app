import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { RendezvousRoutingModule } from './rendezvous-routing.module';
import { RendezvousComponent } from './rendezvous.component';
import { MyRendezvousComponent } from './my-rendezvous/my-rendezvous.component';
import { DataTablesModule } from 'angular-datatables';
import { TableComponent } from '../../components/table/table.component';
import { RdvFormComponent } from 'src/app/components/rdv-form/rdv-form.component';

@NgModule({
  declarations: [
    RendezvousComponent,
    MyRendezvousComponent,
    TableComponent,
    RdvFormComponent
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
