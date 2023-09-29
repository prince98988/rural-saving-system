import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { VehicleHistoryComponent } from './admin/vehicle-history/vehicle-history.component';
import { AuthenticationRoutingModule } from './authentication/authentication-routing.module';
import { LoginComponent } from './authentication/login/login.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';
import { DashboardRoutingModule } from './dashboard/dashboard-routing.module';
import { ReaderDashboardComponent } from './dashboard/reader-dashboard/reader-dashboard.component';
import { WriterDashboardComponent } from './dashboard/writer-dashboard/writer-dashboard.component';
import { WriterRoutingModule } from './writer/writer-routing.module';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthenticationRoutingModule,
    DashboardRoutingModule,
    AdminRoutingModule,
    WriterRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
