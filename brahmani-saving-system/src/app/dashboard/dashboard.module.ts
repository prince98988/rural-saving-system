import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ReaderDashboardComponent } from './reader-dashboard/reader-dashboard.component';
import { WriterDashboardComponent } from './writer-dashboard/writer-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminGuard } from '../general-settings/AccessComponents/AdminGuard';
import { WriterGuard } from '../general-settings/AccessComponents/WriterGuard';
import { ReaderGuard } from '../general-settings/AccessComponents/ReaderGuard';
import { LoginComponent } from '../authentication/login/login.component';
import { AppModule } from '../app.module';
import { PopUpComponent } from '../general-settings/components/pop-up/pop-up.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ReaderDashboardComponent,
    WriterDashboardComponent,
    AdminDashboardComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule, FormsModule],
  exports: [ReaderDashboardComponent],
  providers: [AdminGuard, WriterGuard, ReaderGuard],
})
export class DashboardModule {}
