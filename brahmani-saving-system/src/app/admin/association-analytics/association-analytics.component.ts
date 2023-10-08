import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/general-settings/services/admin.service';
import {
  getMonthList,
  getYearList,
} from 'src/app/general-settings/static/HelperFunctions';

@Component({
  selector: 'app-association-analytics',
  templateUrl: './association-analytics.component.html',
  styleUrls: ['./association-analytics.component.scss'],
})
export class AssociationAnalyticsComponent implements OnInit {
  searchMonthlyDataForm!: FormGroup;
  submitted = false;
  monthList: string[] = getMonthList();
  yearList: string[] = getYearList();
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    public adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.searchMonthlyDataForm = this.formBuilder.group({
      month: ['Nov', []],
      year: ['2023', []],
    });
  }

  async onSubmit() {
    await this.adminService.getAssociationMontlyData(
      this.searchMonthlyDataForm.value.month,
      this.searchMonthlyDataForm.value.year
    );
  }
  get form() {
    return this.searchMonthlyDataForm.controls;
  }
}
