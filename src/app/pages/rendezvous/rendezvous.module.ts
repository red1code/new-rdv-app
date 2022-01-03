import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { RendezvousRoutingModule } from './rendezvous-routing.module';
import { RendezvousComponent } from './rendezvous.component';
import { MyRendezvousComponent } from './my-rendezvous/my-rendezvous.component';
import { DataTablesModule } from 'angular-datatables';
import { TableComponent } from '../../components/table/table.component';
import { NewRdvFormComponent } from 'src/app/components/new-rdv-form/new-rdv-form.component';

@NgModule({
  declarations: [
    RendezvousComponent,
    MyRendezvousComponent,
    TableComponent,
    NewRdvFormComponent
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
