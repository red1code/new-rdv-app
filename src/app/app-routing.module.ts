import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/services/auth.guard';
import { DashboardGuard } from './pages/dashboard/services/dashboard.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/landing-page/landing-page.module').then(m => m.LandingPageModule)
  }, {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }, {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    canLoad: [AuthGuard]
  }, {
    path: 'rendezvous',
    loadChildren: () => import('./pages/rendezvous/rendezvous.module').then(m => m.RendezvousModule),
    canLoad: [AuthGuard]
  }, {
    path: 'profile/:id',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule),
    canLoad: [AuthGuard]
  }, {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
    canLoad: [AuthGuard, DashboardGuard]
  }, {
    path: '**',
    loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
