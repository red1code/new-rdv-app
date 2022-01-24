import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { RendezvousRoutingModule } from './rendezvous-routing.module';
import { RendezvousComponent } from './rendezvous.component';
import { MyRendezvousComponent } from './my-rendezvous/my-rendezvous.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    RendezvousComponent,
    MyRendezvousComponent,
  ],
  imports: [
    CommonModule,
    RendezvousRoutingModule,
    SharedModule
  ]
})
export class RendezvousModule { }
