import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { VehicleHistoryComponent } from './vehicle-history/vehicle-history.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminGuard } from '../general-settings/AccessComponents/AdminGuard';
import UpdateTablesComponent from './update-tables/update-tables.component';
import { AssociationInfoComponent } from './association-info/association-info.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { AssociationAnalyticsComponent } from './association-analytics/association-analytics.component';
import { MemberAnalyticsComponent } from './member-analytics/member-analytics.component';
import { MemberDetailsComponent } from './member-details/member-details.component';
import { LoanEntryComponent } from './loan-entry/loan-entry.component';
import { LoanDetailsComponent } from './loan-details/loan-details.component';

@NgModule({
  declarations: [
    VehicleHistoryComponent,
    EmployeeListComponent,
    AddEmployeeComponent,
    UpdateTablesComponent,
    AssociationInfoComponent,
    AnalyticsComponent,
    AssociationAnalyticsComponent,
    MemberAnalyticsComponent,
    MemberDetailsComponent,
    LoanEntryComponent,
    LoanDetailsComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, ReactiveFormsModule, FormsModule],
  exports: [VehicleHistoryComponent],
  providers: [AdminGuard],
})
export class AdminModule {}
