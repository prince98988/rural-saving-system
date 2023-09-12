import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { VehicleHistoryComponent } from './vehicle-history/vehicle-history.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminGuard } from '../general-settings/AccessComponents/AdminGuard';


@NgModule({
  declarations: [
    VehicleHistoryComponent,
    EmployeeListComponent,
    AddEmployeeComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ],
  exports:[
    VehicleHistoryComponent
  ],
  providers:[AdminGuard]
})
export class AdminModule { }
