import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/general-settings/services/admin.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  removeEmployeeStyle = 'none';
  somethingWentWrongStyle: string = 'none';
  settingsPopUpStyle: string = 'none';
  selectedUserName: string = '';
  selectedUserEmail: string = '';
  loadingDisplayStyle: string = 'none';
  constructor(
    private router: Router,
    @Inject(AdminService)
    public adminService: AdminService
  ) {
    this.getAllEmployee();
  }

  ngOnInit(): void {}

  async getAllEmployee() {
    await this.adminService.getAllMemberMontlyDetails();
  }
  async removeEmployeeEntry() {
    this.openLoadingPopup();
    await this.adminService.removeEmployee(this.selectedUserEmail);
    await this.getAllEmployee();
    this.closeLoadingPopup();
    if (this.adminService.isEmployeeRemoved) this.openRemoveEmployeePopup();
    else this.openErrorPopup();
  }
  openRemoveEmployeePopup() {
    this.removeEmployeeStyle = 'flex';
  }
  closeRemoveEmployeePopup() {
    this.removeEmployeeStyle = 'none';
  }
  openErrorPopup() {
    this.somethingWentWrongStyle = 'flex';
  }
  closeErrorPopup() {
    this.somethingWentWrongStyle = 'none';
  }
  openSettingPopup() {
    this.settingsPopUpStyle = 'flex';
  }
  closeSettingPopup() {
    this.settingsPopUpStyle = 'none';
  }
  addEmployee() {
    this.router.navigate(['add-employee']);
  }
  openLoadingPopup() {
    this.loadingDisplayStyle = 'flex';
  }
  closeLoadingPopup() {
    this.loadingDisplayStyle = 'none';
  }
  onSelectUser(username: string, useremail: string) {
    this.settingsPopUpStyle = 'flex';
    this.selectedUserName = username;
    this.selectedUserEmail = useremail;
  }
}
