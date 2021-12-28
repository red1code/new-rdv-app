import { MyRendezvousComponent } from './my-rendezvous/my-rendezvous.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RendezvousComponent } from './rendezvous.component';
import { AuthGuard } from 'src/app/auth/services/auth.guard';

const routes: Routes = [
  { path: '', component: RendezvousComponent, canActivate: [AuthGuard] },
  { path: 'my-rendezvous', component: MyRendezvousComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RendezvousRoutingModule { }
