import { ProfileComponent } from './profile/profile.component';
import { MyRendezvousComponent } from './my-rendezvous/my-rendezvous.component';
import { RendezvousComponent } from './rendezvous/rendezvous.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'rendezvous', component: RendezvousComponent },
  { path: 'my-rendezvous', component: MyRendezvousComponent },
  { path: 'profile/:id', component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
