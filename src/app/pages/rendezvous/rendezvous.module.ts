import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RendezvousRoutingModule } from './rendezvous-routing.module';
import { RendezvousComponent } from './rendezvous.component';
import { MyRendezvousComponent } from './my-rendezvous/my-rendezvous.component';


@NgModule({
  declarations: [
    RendezvousComponent,
    MyRendezvousComponent
  ],
  imports: [
    CommonModule,
    RendezvousRoutingModule
  ]
})
export class RendezvousModule { }
