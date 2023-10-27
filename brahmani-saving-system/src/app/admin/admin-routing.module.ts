import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from '../dashboard/admin-dashboard/admin-dashboard.component';
import { AdminGuard } from '../general-settings/AccessComponents/AdminGuard';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { VehicleHistoryComponent } from './vehicle-history/vehicle-history.component';
import UpdateTablesComponent from './update-tables/update-tables.component';
import { AssociationInfoComponent } from './association-info/association-info.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { MemberAnalyticsComponent } from './member-analytics/member-analytics.component';
import { AssociationAnalyticsComponent } from './association-analytics/association-analytics.component';
import { MemberDetailsComponent } from './member-details/member-details.component';
import { LoanEntryComponent } from './loan-entry/loan-entry.component';
import { LoanDetailsComponent } from './loan-details/loan-details.component';
import { UpdateMemberComponent } from './update-member/update-member.component';

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
    canActivate: [AdminGuard],
  },
  {
    path: 'add-member',
    component: AddEmployeeComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'update-member',
    component: UpdateMemberComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'update-tables',
    component: UpdateTablesComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'association-info',
    component: AssociationInfoComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'analytics',
    component: AnalyticsComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'association-analytics',
    component: AssociationAnalyticsComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'member-analytics',
    component: MemberAnalyticsComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'member-details',
    component: MemberDetailsComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'loan-entry',
    component: LoanEntryComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'loan-details',
    component: LoanDetailsComponent,
    canActivate: [AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
