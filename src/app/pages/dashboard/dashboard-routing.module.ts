import { AuthGuard } from './../../auth/services/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardGuard } from './services/dashboard.guard';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard, DashboardGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
