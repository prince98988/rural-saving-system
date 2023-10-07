import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from '../dashboard/admin-dashboard/admin-dashboard.component';
import { AdminGuard } from '../general-settings/AccessComponents/AdminGuard';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { VehicleHistoryComponent } from './vehicle-history/vehicle-history.component';
import { UpdateTablesComponent } from './update-tables/update-tables.component';
import { AssociationInfoComponent } from './association-info/association-info.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { MemberAnalyticsComponent } from './member-analytics/member-analytics.component';
import { AssociationAnalyticsComponent } from './association-analytics/association-analytics.component';
import { MemberDetailsComponent } from './member-details/member-details.component';

export const adminRoutes: Routes = [
  {
    path: 'vehicle-history',
    component: VehicleHistoryComponent,
    pathMatch: 'full',
    canActivate: [AdminGuard],
  },
  {
    path: 'manage-members',
    component: EmployeeListComponent,
    pathMatch: 'full',
  },
  {
    path: 'add-member',
    component: AddEmployeeComponent,
  },
  {
    path: 'update-tables',
    component: UpdateTablesComponent,
  },
  {
    path: 'association-info',
    component: AssociationInfoComponent,
  },
  {
    path: 'analytics',
    component: AnalyticsComponent,
  },
  {
    path: 'association-analytics',
    component: AssociationAnalyticsComponent,
  },
  {
    path: 'member-analytics',
    component: MemberAnalyticsComponent,
  },
  {
    path: 'member-details',
    component: MemberDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
