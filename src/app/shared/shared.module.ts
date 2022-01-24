import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { TableComponent } from './table/table.component';
import { RdvFormComponent } from './rdv-form/rdv-form.component'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EditProfileComponent } from './edit-profile/edit-profile.component';



@NgModule({
  declarations: [
    TableComponent,
    RdvFormComponent,
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    TableComponent,
    RdvFormComponent,
    EditProfileComponent
  ]
})
export class SharedModule { }
