import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/general-settings/services/admin.service';

@Component({
  selector: 'app-update-tables',
  templateUrl: './update-tables.component.html',
  styleUrls: ['./update-tables.component.scss'],
})
export default class UpdateTablesComponent implements OnInit {
  public get adminService(): AdminService {
    return this._adminService;
  }
  public set adminService(value: AdminService) {
    this._adminService = value;
  }
  removeEmployeeStyle = 'none';
  somethingWentWrongStyle: string = 'none';
  loadingDisplayStyle: string = 'none';

  constructor(
    private router: Router,
    @Inject(AdminService)
    private _adminService: AdminService
  ) {}
  ngOnInit(): void {}

  async startNewSprint() {
    this.openLoadingPopup();
    await this.adminService.startNextMonth();
    this.closeLoadingPopup();
    if (this.adminService.isNextMonthStarted) this.openNewMonthStarted();
    else this.openErrorPopup();
  }

  gotoLoanEntryPage() {
    this.router.navigate(['loan-entry']);
  }

  openErrorPopup() {
    this.somethingWentWrongStyle = 'flex';
  }
  closeErrorPopup() {
    this.somethingWentWrongStyle = 'none';
  }
  openLoadingPopup() {
    this.loadingDisplayStyle = 'flex';
  }
  closeLoadingPopup() {
    this.loadingDisplayStyle = 'none';
  }
  openNewMonthStarted() {
    this.removeEmployeeStyle = 'flex';
  }
  closeNewMonthStarted() {
    this.removeEmployeeStyle = 'none';
  }

  goBackToDashboard() {
    this.router.navigate(['dashboard-admin']);
  }
}
