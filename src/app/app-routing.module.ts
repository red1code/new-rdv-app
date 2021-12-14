import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'pages/home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'pages/rendezvous', loadChildren: () => import('./pages/rendezvous/rendezvous.module').then(m => m.RendezvousModule) },
  { path: 'pages/landing-page', loadChildren: () => import('./pages/landing-page/landing-page.module').then(m => m.LandingPageModule) },
  { path: 'pages/not-found', loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule) },
  { path: 'pages/dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
  // { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  // { path: '**', component: NotFounedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
