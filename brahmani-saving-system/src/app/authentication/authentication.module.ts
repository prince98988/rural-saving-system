import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

import { LoginComponent } from './login/login.component';
import { DashboardModule } from '../dashboard/dashboard.module';
import { BrowserModule } from '@angular/platform-browser';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { PasscodeComponent } from './passcode-page/passcode.component';
import { PasscodeLoginComponent } from './passcode-login/passcode-login.component';
import { AdminGuard } from '../general-settings/AccessComponents/AdminGuard';
import { ReaderGuard } from '../general-settings/AccessComponents/ReaderGuard';

@NgModule({
  declarations: [
    LoginComponent,
    UpdatePasswordComponent,
    PasscodeComponent,
    PasscodeLoginComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardModule
  ],
  exports:[
    LoginComponent
  ],
  providers:[CookieService, ReaderGuard]
})
export class AuthenticationModule { }
