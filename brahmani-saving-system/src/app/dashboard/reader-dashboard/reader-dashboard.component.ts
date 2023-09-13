import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ReaderService } from 'src/app/general-settings/services/reader.service';
import { getCurrentUserEmail, getCurrentUserName, hideCardAnimation, makeCardAnimation } from 'src/app/general-settings/static/HelperFunctions';

@Component({
  selector: 'app-reader-dashboard',
  templateUrl: './reader-dashboard.component.html',
  styleUrls: ['./reader-dashboard.component.scss']
})
export class ReaderDashboardComponent implements OnInit {

  constructor(
    private router: Router,
    @Inject(ReaderService) 
    public readerService:ReaderService, 
    private cookieService: CookieService,) { 
    this.getDashboardData();
  }
  settingsPopUpStyle = 'none'
  ngOnInit(): void {
    this.readerService.makeLoader();
    this.readerService.userName = getCurrentUserName(this.cookieService)
    this.readerService.useEmail = getCurrentUserEmail(this.cookieService)
  }

  async getDashboardData(){
    await this.readerService.requestDashboardData();
  }

  openSettingPopup() {
    this.settingsPopUpStyle = "flex";
  }
  closeSettingPopup() {
    this.settingsPopUpStyle = "none";
  }
  goToChangePassword() {
    this.router.navigate(['update-password']);
  }
  logOut() {
    this.cookieService.deleteAll();
    this.router.navigate(['login']);
  }

}
