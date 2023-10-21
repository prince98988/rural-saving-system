import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminRoutes, AdminRoutingModule } from '../admin/admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ReaderDashboardComponent } from './reader-dashboard/reader-dashboard.component';
import { WriterDashboardComponent } from './writer-dashboard/writer-dashboard.component';
import { WriterRoutingModule } from '../writer/writer-routing.module';
import { AdminGuard } from '../general-settings/AccessComponents/AdminGuard';
import { WriterGuard } from '../general-settings/AccessComponents/WriterGuard';

const routes: Routes = [
  {
    path: 'dashboard-reader',
    component: ReaderDashboardComponent,
  },
  {
    path: 'dashboard-writer',
    component: WriterDashboardComponent,
    canActivate: [WriterGuard],
  },
  {
    path: 'dashboard-admin',
    component: AdminDashboardComponent,
    canActivate: [AdminGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    AdminRoutingModule,
    WriterRoutingModule,
  ],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
