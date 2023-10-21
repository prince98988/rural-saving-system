import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemberData } from 'src/app/general-settings/Types/ReaderTypes';
import { AdminService } from 'src/app/general-settings/services/admin.service';

@Component({
  selector: 'app-loan-details',
  templateUrl: './loan-details.component.html',
  styleUrls: ['./loan-details.component.scss'],
})
export class LoanDetailsComponent implements OnInit {
  searchText: string = '';
  constructor(
    private router: Router,
    @Inject(AdminService)
    public adminService: AdminService
  ) {
    this.getAllLoanEmployee();
  }

  ngOnInit(): void {}

  async getAllLoanEmployee() {
    await this.adminService.getAllLoanMemberDetails();
  }

  onSelectUser(userData: MemberData) {}
}
