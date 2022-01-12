import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from 'src/app/components/edit-profile/edit-profile.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent,
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class HomeModule { }
