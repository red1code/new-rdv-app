import { NotFounedComponent } from './components/not-founed/not-founed.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '', component: LandingPageComponent },
  {
    path: 'auth',
    loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule)
  }, {
    path: 'home',
    loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)
  }, {
    path: 'dashboard',
    loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  { path: '**', component: NotFounedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
