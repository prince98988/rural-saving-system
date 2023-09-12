import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationModule } from './authentication/authentication.module';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { DashboardModule } from './dashboard/dashboard.module';
import { AdminModule } from './admin/admin.module';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule } from '@angular/common/http';
import { PopUpComponent } from './general-settings/components/pop-up/pop-up.component';

@NgModule({
  declarations: [
    AppComponent,
    PopUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthenticationModule,
    AdminModule,
    DashboardModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports:[PopUpComponent],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {
  static forRoot(){
    return {
    ngModule:AppModule
    };
 }
}
