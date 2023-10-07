import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { timeInterval } from 'rxjs';
import { MemberData } from 'src/app/general-settings/Types/ReaderTypes';
import { AdminService } from 'src/app/general-settings/services/admin.service';

@Component({
  selector: 'app-member-analytics',
  templateUrl: './member-analytics.component.html',
  styleUrls: ['./member-analytics.component.scss'],
})
export class MemberAnalyticsComponent implements OnInit {
  removeEmployeeStyle = 'none';
  somethingWentWrongStyle: string = 'none';
  settingsPopUpStyle: string = 'none';
  selectedUserName: string = '';
  selectedUserPhoneNumber: string = '';
  loadingDisplayStyle: string = 'none';
  searchText: string = '';
  constructor(
    private router: Router,
    @Inject(AdminService)
    public adminService: AdminService,
    private cookieService: CookieService
  ) {
    this.getAllEmployee();
  }

  ngOnInit(): void {}

  async getAllEmployee() {
    await this.adminService.getAllMemberDetails();
  }
  async removeEmployeeEntry() {
    // this.openLoadingPopup();
    // await this.adminService.removeEmployee(this.selectedUserPhoneNumber);
    // await this.getAllEmployee();
    // this.closeLoadingPopup();
    // if (this.adminService.isEmployeeRemoved) this.openRemoveEmployeePopup();
    // else this.openErrorPopup();
  }

  onSelectUser(userData: MemberData) {
    this.cookieService.set('memberDetails', JSON.stringify(userData), {
      expires: 1,
    });
    this.router.navigate(['member-details']);
  }
}
