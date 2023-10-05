import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CookieService } from 'ngx-cookie-service';
import { MemberData, UserMonthlyData } from '../Types/ReaderTypes';

@Injectable({
  providedIn: 'root',
})
export class HelpService {
  constructor(
    private firestore: AngularFirestore,
    private cookieService: CookieService
  ) {}

  allMembersData: Array<MemberData> = [];

  async getAllMemberData() {
    this.allMembersData = [];
    await this.firestore
      .collection('memberTable')
      .get()
      .forEach((collection) => {
        collection.docs.find((document) => {
          var json = JSON.parse(JSON.stringify(document.data()));
          this.allMembersData.push(json);
        });
      });
    console.log(this.allMembersData);
    return this.allMembersData;
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
    return JSON.parse(JSON.stringify(associationData));
  }

  async getMemberDetails(phoneNumber: string) {
    var memberDetails!: MemberData;
    //get assiciation data
    await this.firestore
      .collection('memberDetails')
      .get()
      .forEach((collection) => {
        collection.docs.find((document) => {
          var json = JSON.parse(JSON.stringify(document.data()));
          if (json.PhoneNumber == phoneNumber) {
            memberDetails = json;
          }
        });
      });

    this.cookieService.set('memberDetails', JSON.stringify(memberDetails), {
      expires: 1,
    });
    return memberDetails;
  }

  async getMemberMonthlyDetails(
    phoneNumber: string,
    month: string,
    year: string
  ) {
    var userMonthltyDetails!: UserMonthlyData;
    //get assiciation data
    await this.firestore
      .collection('monthlyUserData/' + year + '/' + month)
      .get()
      .forEach((collection) => {
        collection.docs.find((document) => {
          var json = JSON.parse(JSON.stringify(document.data()));
          if (json.PhoneNumber == phoneNumber) {
            userMonthltyDetails = json;
          }
        });
      });

    return userMonthltyDetails;
  }
}
