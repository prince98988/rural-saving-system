import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WriterRoutingModule } from './writer-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddMontlyEntryComponent } from './add-montly-entry/add-montly-entry.component';
import { WriterGuard } from '../general-settings/AccessComponents/WriterGuard';

@NgModule({
  declarations: [AddMontlyEntryComponent],
  imports: [
    CommonModule,
    WriterRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [AddMontlyEntryComponent],
  providers: [WriterGuard],
})
export class WriterModule {}
