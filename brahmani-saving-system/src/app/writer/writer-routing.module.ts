import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMontlyEntryComponent } from './add-montly-entry/add-montly-entry.component';
import { CommonModule } from '@angular/common';

export const writerRoutes: Routes = [
  {
    path: 'add-montly-entry',
    component: AddMontlyEntryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(writerRoutes), CommonModule],
  exports: [RouterModule],
})
export class WriterRoutingModule {}
