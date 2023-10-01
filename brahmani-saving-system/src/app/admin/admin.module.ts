import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { VehicleHistoryComponent } from './vehicle-history/vehicle-history.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminGuard } from '../general-settings/AccessComponents/AdminGuard';
import { UpdateTablesComponent } from './update-tables/update-tables.component';
import { AssociationInfoComponent } from './association-info/association-info.component';

@NgModule({
  declarations: [
    VehicleHistoryComponent,
    EmployeeListComponent,
    AddEmployeeComponent,
    UpdateTablesComponent,
    AssociationInfoComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, ReactiveFormsModule, FormsModule],
  exports: [VehicleHistoryComponent],
  providers: [AdminGuard],
})
export class AdminModule {}
