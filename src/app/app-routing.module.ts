import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent, DashboardModule} from './features/dashboard';
import { CareerPlanFormComponent, CareerPlanFormModule } from './features/career-plan-form'
import { LoginComponent, LoginModule } from './features/login';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'career-plan-form',
    component: CareerPlanFormComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CareerPlanFormModule,
    DashboardModule,
    LoginModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
