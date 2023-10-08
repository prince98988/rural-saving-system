import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GeneralHeader } from '../static/Haders';
import { reader_dashboard_details } from '../static/Urls';
import {
  decryptData,
  encryptData,
  getCurrentUserMobileNumber,
  getCurrentUserName,
  getCurrentUserType,
  hideCardAnimation,
  makeCardAnimation,
} from '../static/HelperFunctions';
import {
  MemberData,
  AssociationData,
  UserMonthlyData,
} from '../Types/ReaderTypes';
import { CookieService } from 'ngx-cookie-service';
import { ReaderDashboardBodyRequest } from '../static/Body';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ReaderService {
  isReaderDashboardDataLoaded = false;
  memberData!: MemberData;
  associationData!: AssociationData;
  userCurrentMonthData!: UserMonthlyData;
  userName!: string;
  useEmail!: string;
  memberRole!: string;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private firestore: AngularFirestore,
    private router: Router
  ) {
    this.userName = getCurrentUserName(cookieService);
    this.useEmail = getCurrentUserMobileNumber(cookieService);
  }

  isReader() {
    var userType = getCurrentUserType(this.cookieService);
    if (userType == 'Admin' || userType == 'Writer' || userType == 'Reader') {
      return true;
    } else return false;
  }
  async requestDashboardData() {
    if (this.cookieService.check('userMobileNumber')) {
      this.memberData = await this.getUserData(
        this.cookieService.get('userMobileNumber')
      );
      this.hideLoader();
    } else {
      this.router.navigate(['login']);
    }
  }

  async getUserData(mmobile: string) {
    //get user data
    var userData!: MemberData;
    var list: any[] = [];
    await this.firestore
      .collection('memberTable')
      .get()
      .forEach((collection) => {
        collection.docs.find((document) => {
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

    this.cookieService.set('role', encryptData(userData.Role));
    this.memberRole = userData.Role;

    if (userData != null) {
      await this.getAssociationData();
      await this.getUserCurrentMonthData(mmobile);
    }

    console.log(this.associationData);
    if (userData == null || this.associationData == null) {
      this.router.navigate(['login']);
    }
    return JSON.parse(JSON.stringify(userData));
  }

  async getAssociationData() {
    var list: any = [];
    //get assiciation data
    await this.firestore
      .collection('associationTable')
      .get()
      .forEach((collection) => {
        collection.docs.find((document) => {
          var json = JSON.parse(JSON.stringify(document.data()));
          list.push(json);
        });
      });
    var associationData = list[0];
    this.cookieService.set('associationData', JSON.stringify(associationData), {
      expires: 1,
    });
    this.associationData = JSON.parse(JSON.stringify(associationData));
  }

  async getUserCurrentMonthData(mmobile: string) {
    var list: any = [];
    //get assiciation data
    await this.firestore
      .collection('monthlyUserData/2023/Nov')
      .get()
      .forEach((collection) => {
        var response = collection.docs.find((document) => {
          if (document.id == mmobile) {
            var json = JSON.parse(JSON.stringify(document.data()));
            list.push(json);
          }
        });
      });

    list.forEach((userMonthlyData: any) => {
      if (userMonthlyData.PhoneNumber == mmobile) {
        this.userCurrentMonthData = userMonthlyData;
      }
    });
    if (this.userCurrentMonthData == null) {
      this.userCurrentMonthData = {
        PhoneNumber: mmobile,
        Premium: 0,
        PremiumStatus: true,
        LoanAmount: 0,
        InterestAmount: 0,
        InterestStatus: true,
        PenaltyPaid: 0,
        DateTime: new Date(),
      };
    }
    console.log(this.userCurrentMonthData);
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
