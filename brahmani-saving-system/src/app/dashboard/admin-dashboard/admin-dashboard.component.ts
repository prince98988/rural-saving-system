import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AdminDashboardEnglish,
  AdminDashboardGujarati,
} from 'src/app/general-settings/Languages/AdminDashboardLanguage';
import { AdminService } from 'src/app/general-settings/services/admin.service';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  languageClass!: any;
  constructor(private router: Router, public adminService: AdminService) {
    this.selectLanguageClass();
  }

  ngOnInit(): void {
    //this.makeLoader()
  }
  goToReader() {
    this.router.navigate(['dashboard-reader']);
  }
  goToWriter() {
    this.router.navigate(['dashboard-writer']);
  }
  goToAnalytics(): void {
    this.router.navigate(['analytics']);
  }
  showEmployeeList(): void {
    this.router.navigate(['manage-members']);
  }

  gotoConfiguration(): void {
    this.router.navigate(['association-info']);
  }

  gotoUpdateTables(): void {
    this.router.navigate(['update-tables']);
  }

  switchLanguage() {
    this.adminService.switchLanguage();
    this.selectLanguageClass();
  }
  selectLanguageClass() {
    if (this.adminService.appLanguage == 'English') {
      this.languageClass = AdminDashboardEnglish;
    } else {
      this.languageClass = AdminDashboardGujarati;
    }
  }
}
