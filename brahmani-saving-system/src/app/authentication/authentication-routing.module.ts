import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ReaderDashboardComponent } from '../dashboard/reader-dashboard/reader-dashboard.component';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { PasscodeComponent } from './passcode-page/passcode.component';
import { PasscodeLoginComponent } from './passcode-login/passcode-login.component';
import { ReaderGuard } from '../general-settings/AccessComponents/ReaderGuard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: UpdatePasswordComponent },
  {
    path: 'update-password',
    component: UpdatePasswordComponent,
    canActivate: [ReaderGuard],
  },
  { path: 'create-passcode', component: PasscodeComponent },
  {
    path: 'login-passcode',
    component: PasscodeLoginComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes), DashboardRoutingModule],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
