import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AdminService } from 'src/app/general-settings/services/admin.service';
import {
  getMonthList,
  getYearList,
} from 'src/app/general-settings/static/HelperFunctions';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.scss'],
})
export class MemberDetailsComponent implements OnInit {
  searchMonthlyDataForm!: FormGroup;
  submitted = false;
  monthList: string[] = getMonthList();
  yearList: string[] = getYearList();
  constructor(
    private router: Router,
    @Inject(AdminService)
    public adminService: AdminService,
    private cookieService: CookieService,
    private formBuilder: FormBuilder
  ) {
    this.getAllEmployee();
  }

  async getAllEmployee() {
    this.adminService.getMemberDetails();
  }
  ngOnInit(): void {
    this.searchMonthlyDataForm = this.formBuilder.group({
      month: ['Nov', []],
      year: ['2023', []],
    });
  }

  async onSubmit() {
    await this.adminService.getMemberMothlyDetails(
      this.searchMonthlyDataForm.value.month,
      this.searchMonthlyDataForm.value.year
    );
  }
  get form() {
    return this.searchMonthlyDataForm.controls;
  }

  goBackToDashboard() {
    this.router.navigate(['member-analytics']);
  }

  parseInt(value: any) {
    return parseInt(value);
  }
}
