import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminRoutes, AdminRoutingModule } from '../admin/admin-routing.module';
import { VehicleHistoryComponent } from '../admin/vehicle-history/vehicle-history.component';
import { AdminGuard } from '../general-settings/AccessComponents/AdminGuard';
import { ReaderGuard } from '../general-settings/AccessComponents/ReaderGuard';
import { WriterGuard } from '../general-settings/AccessComponents/WriterGuard';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ReaderDashboardComponent } from './reader-dashboard/reader-dashboard.component';
import { WriterDashboardComponent } from './writer-dashboard/writer-dashboard.component';

const routes: Routes = [
  { path: 'dashboard-reader', component: ReaderDashboardComponent },
  {
    path: 'dashboard-writer',
    component: WriterDashboardComponent,
  },
  {
    path: 'dashboard-admin',
    component: AdminDashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), AdminRoutingModule],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
