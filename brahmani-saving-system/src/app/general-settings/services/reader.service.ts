import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GeneralHeader } from '../static/Haders';
import { reader_dashboard_details } from '../static/Urls';
import {
  decryptData,
  encryptData,
  getCurrentUserEmail,
  getCurrentUserName,
  getCurrentUserType,
  hideCardAnimation,
  makeCardAnimation,
} from '../static/HelperFunctions';
import { ReaderDashboardData } from '../Types/ReaderTypes';
import { CookieService } from 'ngx-cookie-service';
import { ReaderDashboardBodyRequest } from '../static/Body';

@Injectable({
  providedIn: 'root',
})
export class ReaderService {
  isReaderDashboardDataLoaded = false;
  dashboardData!: ReaderDashboardData;
  userName!: string;
  useEmail!: string;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.userName = getCurrentUserName(cookieService);
    this.useEmail = getCurrentUserEmail(cookieService);
  }

  isReader() {
    var userType = getCurrentUserType(this.cookieService)
    if (
      userType == 'Admin' ||
      userType == 'Writer' ||
      userType == 'Reader'
    ) {
      return true;
    } else return false;
  }
  async requestDashboardData() {
    const headers = GeneralHeader();
    const currentTime = new Date().toISOString();
    //remaining
    const body = ReaderDashboardBodyRequest(currentTime)
    const url = reader_dashboard_details 
    await this.http
      .post(url, body, { headers })
      .toPromise()
      .then((data) => {
        this.dashboardData = JSON.parse(JSON.stringify(data));
        this.hideLoader();
      })
      .catch((error) => {
        this.hideLoader();
        this.isReaderDashboardDataLoaded = false;
      });
  }

  makeLoader() {
    this.isReaderDashboardDataLoaded = false;
    makeCardAnimation('card-car');
    makeCardAnimation('card-bike');
    makeCardAnimation('fit-content');
    makeCardAnimation('welcome-box');
  }
  hideLoader() {
    this.isReaderDashboardDataLoaded = true;
    hideCardAnimation('card-car');
    hideCardAnimation('card-bike');
    hideCardAnimation('fit-content');
    hideCardAnimation('welcome-box');
  }
}
