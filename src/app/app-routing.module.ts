import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "../app/login/login.component"
import { SignupComponent } from "../app/signup/signup.component"
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  { path: "" , redirectTo: '/login', pathMatch: 'full' },
  { path: "login" , component: LoginComponent},
  { path: "signUp", component: SignupComponent},
  {path: "dashboard", component:DashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
