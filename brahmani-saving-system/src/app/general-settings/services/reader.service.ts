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
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ReaderService {
  isReaderDashboardDataLoaded = false;
  dashboardData!: ReaderDashboardData;
  userName!: string;
  useEmail!: string;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private firestore: AngularFirestore,
    private router: Router
  ) {
    this.userName = getCurrentUserName(cookieService);
    this.useEmail = getCurrentUserEmail(cookieService);
  }

  isReader() {
    var userType = getCurrentUserType(this.cookieService);
    if (userType == 'Admin' || userType == 'Writer' || userType == 'Reader') {
      return true;
    } else return false;
  }
  async requestDashboardData() {
    if (this.cookieService.check('userMobileNumber')) {
      await this.getUserData(this.cookieService.get('userMobileNumber'));
    } else {
      this.router.navigate(['login']);
    }
  }

  async getUserData(mmobile: string) {
    //get user data
    var userData = null;
    var list: any[] = [];
    await this.firestore
      .collection('memberTable')
      .get()
      .forEach((collection) => {
        var response = collection.docs.find((document) => {
          console.log(document.data());
          var json = JSON.parse(JSON.stringify(document.data()));
          list.push(json);
        });
      });
    list.forEach((user) => {
      if (user.PhoneNumber == mmobile) {
        userData = user;
      }
    });

    this.cookieService.set('userData', JSON.stringify(userData), {
      expires: 1,
    });

    if (userData != null) {
      list = [];
      //get assiciation data
      await this.firestore
        .collection('associationTable')
        .get()
        .forEach((collection) => {
          var response = collection.docs.find((document) => {
            console.log(document.data());
            var json = JSON.parse(JSON.stringify(document.data()));
            list.push(json);
          });
        });
      var associationData = list[0];
      this.cookieService.set(
        'associationData',
        JSON.stringify(associationData),
        {
          expires: 1,
        }
      );
    }
    console.log(this.cookieService.get('userData'));
    console.log(this.cookieService.get('associationData'));
    if (userData != null) return JSON.parse(JSON.stringify(userData)).Role;
    else return 'Unknown';
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
