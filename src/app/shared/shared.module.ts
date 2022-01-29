import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { TableComponent } from './table/table.component';
import { RdvFormComponent } from './rdv-form/rdv-form.component'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ChartComponent } from './chart/chart.component';
import { NgChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [
    TableComponent,
    RdvFormComponent,
    EditProfileComponent,
    ChartComponent
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    ReactiveFormsModule,
    FormsModule,
    NgChartsModule
  ],
  exports: [
    TableComponent,
    RdvFormComponent,
    EditProfileComponent,
    ChartComponent
  ]
})
export class SharedModule { }
