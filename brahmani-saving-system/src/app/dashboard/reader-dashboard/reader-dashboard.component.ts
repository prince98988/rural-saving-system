import { LocationStrategy } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ReaderService } from 'src/app/general-settings/services/reader.service';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  getCurrentUserMobileNumber,
  getCurrentUserName,
  getSelectedLanguage,
} from 'src/app/general-settings/static/HelperFunctions';
import {
  ReaderDashboardEnglish,
  ReaderDashboardGujarati,
} from 'src/app/general-settings/Languages/ReaderDashboardLanguage';

@Component({
  selector: 'app-reader-dashboard',
  templateUrl: './reader-dashboard.component.html',
  styleUrls: ['./reader-dashboard.component.scss'],
})
export class ReaderDashboardComponent implements OnInit {
  private unsubscriber: Subject<void> = new Subject<void>();
  readerRole: string = 'reader';
  languageClass!: any;
  constructor(
    private router: Router,
    @Inject(ReaderService)
    public readerService: ReaderService,
    private cookieService: CookieService
  ) {
    history.pushState(null, '');

    fromEvent(window, 'popstate')
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((_) => {
        history.pushState(null, '');
      });
    this.getDashboardData();
    this.selectLanguageClass();
  }
  settingsPopUpStyle = 'none';
  ngOnInit(): void {
    this.readerService.makeLoader();
    this.readerService.userName = getCurrentUserName(this.cookieService);
    this.readerService.useEmail = getCurrentUserMobileNumber(
      this.cookieService
    );
  }

  async getDashboardData() {
    await this.readerService.requestDashboardData();
  }

  openSettingPopup() {
    this.settingsPopUpStyle = 'flex';
  }
  closeSettingPopup() {
    this.settingsPopUpStyle = 'none';
  }
  goToChangePassword() {
    this.router.navigate(['update-password']);
  }
  logOut() {
    this.cookieService.deleteAll();
    this.router.navigate(['login']);
  }
  goToMemberRoleScreen() {
    this.router.navigate(['dashboard-' + this.readerService.memberRole]);
  }
  switchLanguage() {
    this.readerService.switchLanguage();
    this.selectLanguageClass();
  }
  selectLanguageClass() {
    if (this.readerService.appLanguage == 'English') {
      this.languageClass = ReaderDashboardEnglish;
    } else {
      this.languageClass = ReaderDashboardGujarati;
    }
  }
}
