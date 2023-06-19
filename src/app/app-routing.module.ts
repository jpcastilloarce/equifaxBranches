import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UserGuardGuard } from './user-guard.guard';

const routes:Routes = [
  { path : '', redirectTo : '/login', pathMatch : 'full' },
  { path : 'home', component : HomeComponent, canActivate: [UserGuardGuard]},
  { path : 'login', component : LoginComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
