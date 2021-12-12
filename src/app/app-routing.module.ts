import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'components/auth', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule) }, { path: 'components/home', loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule) }, { path: 'components/dashboard', loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
