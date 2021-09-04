import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './components/register/register.component';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthGuardLoggedService } from './services/auth-guard-logged.service';
import { DetailComponent } from './components/main/detail/detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full'},
  { path: 'main', component: MainComponent, canActivate: [AuthGuardService]},
  { path: 'detail', component: DetailComponent, canActivate: [AuthGuardService]},
  // { path: '', component: MainComponent},
  // { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent, canActivate: [AuthGuardLoggedService]}

   // { path: '', redirectTo: '/login', pathMatch: 'full'},
  // {
  //   path: '',
  //   component: LoginComponent,
  //   canActivate: [AuthGuardService],
  //   children:[
  //     { path: 'main', component: MainComponent}
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
