import { MyRendezvousComponent } from './my-rendezvous/my-rendezvous.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RendezvousComponent } from './rendezvous.component';

const routes: Routes = [
  { path: '', component: RendezvousComponent },
  { path: 'my-rendezvous', component: MyRendezvousComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RendezvousRoutingModule { }
