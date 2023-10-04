import { HttpClient } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  BikeEntryBodyRequest,
  CarEntryBodyRequest,
  DeleteEntryBodyRequest,
} from '../static/Body';
import { GeneralHeader } from '../static/Haders';
import {
  decryptData,
  encryptData,
  getCurrentUserName,
  getCurrentUserType,
  hideCardAnimation,
  makeCardAnimation,
} from '../static/HelperFunctions';
import {
  delete_vehicle_entry,
  gel_all_vehicle_entry,
  post_vehicle_entry,
  writer_dashboard_details,
} from '../static/Urls';
import { Vehicle, WriterDashboardData } from '../Types/WriterType';
import {
  MemberData,
  UserCurrentMonthData,
  UserMonthlyData,
} from '../Types/ReaderTypes';
import { HelpService } from './help.service';

@Injectable({
  providedIn: 'root',
})
export class WriterService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private firestore: AngularFirestore,
    private helpService: HelpService
  ) {
    this.userName = getCurrentUserName(cookieService);
  }
  userName!: string;
  isDashBoardDetailsAdded = true;
  isVehicleAdded = true;
  isVehicleDeleted = true;
  isAllVehicleEntriesAdded = true;
  vehicleEntries: Array<Vehicle> = [];
  membersMonthlyDetails: Array<UserCurrentMonthData> = [];
  searchedMembersMonthlyDetails: Array<UserCurrentMonthData> = [];
  memberCurrentMonthData!: UserCurrentMonthData;

  isWriter() {
    var userType = getCurrentUserType(this.cookieService);
    if (userType == 'Admin' || userType == 'Writer') {
      return true;
    } else return false;
  }

  async getCurrentMonthData() {
    var data = JSON.parse(
      decryptData(await this.cookieService.get('memberCurrentMonthData'))
    );
    this.memberCurrentMonthData = data.memberCurrentMonthData;

    console.log(typeof this.memberCurrentMonthData);
    console.log(this.memberCurrentMonthData.FirstName);
  }

  makeLoader() {
    makeCardAnimation('card-car');
    makeCardAnimation('card-bike');
    makeCardAnimation('fit-content');
    makeCardAnimation('card-vehicle-entry');
  }
  hideLoader() {
    hideCardAnimation('card-car');
    hideCardAnimation('card-bike');
    hideCardAnimation('fit-content');
    hideCardAnimation('card-vehicle-entry');
  }
  async getAllMembersMontlyDetails() {
    this.isDashBoardDetailsAdded = false;
    this.membersMonthlyDetails = [];
    await this.firestore
      .collection('monthlyUserData/2023/Nov')
      .get()
      .forEach((collection) => {
        collection.docs.find((document) => {
          var json = JSON.parse(JSON.stringify(document.data()));
          this.membersMonthlyDetails.push(json);
        });
      });

    var memberData: Array<MemberData> =
      await this.helpService.getAllMemberData();
    console.log(memberData);
    if (memberData != null) {
      for (var index = 0; index < this.membersMonthlyDetails.length; index++) {
        memberData.find((memberData) => {
          console.log(memberData.PhoneNumber);
          if (
            memberData.PhoneNumber ==
            this.membersMonthlyDetails[index].PhoneNumber
          ) {
            this.membersMonthlyDetails[index].FirstName = memberData.FirstName;
            this.membersMonthlyDetails[index].MiddleName =
              memberData.MiddleName;
            this.membersMonthlyDetails[index].LastName = memberData.LastName;
            this.membersMonthlyDetails[index].Role = memberData.Role;
            this.membersMonthlyDetails[index].Shares = memberData.Shares;
            this.membersMonthlyDetails[index].PremiumPaid =
              memberData.PremiumPaid;
            this.membersMonthlyDetails[index].LoanAmount =
              memberData.LoanAmount;
            this.membersMonthlyDetails[index].TotalPenaltyPaid =
              memberData.TotalPenaltyPaid;
            this.membersMonthlyDetails[index].InterestPaid =
              memberData.InterestPaid;
            this.membersMonthlyDetails[index].NextMonthPremium =
              memberData.NextMonthInterest;
            this.membersMonthlyDetails[index].NextMonthInterest =
              memberData.NextMonthInterest;
          }
        });
      }
    }
    this.searchedMembersMonthlyDetails = this.membersMonthlyDetails;
    console.log(this.membersMonthlyDetails);
  }

  searchMembers(text: any) {
    console.log(text);
    this.searchedMembersMonthlyDetails = this.membersMonthlyDetails.filter(
      (member) =>
        member.PhoneNumber.indexOf(text) != -1 ||
        member.FirstName.indexOf(text) != -1
    );
  }
  async AddMemberMontlyEntry(penalty: number) {
    await this.firestore
      .collection('monthlyUserData/2023/Nov')
      .doc(this.memberCurrentMonthData.PhoneNumber)
      .update({
        InterestStatus: true,
        PremiumStatus: true,
        PenaltyPaid: penalty,
      });

    var data = await this.helpService.getAssociationData();
    var newTotalBalance =
      parseInt(data.TotalBalance) +
      this.memberCurrentMonthData.Premium +
      this.memberCurrentMonthData.InterestAmount;
    var newAvailableBalance =
      parseInt(data.AvailableBalance) +
      this.memberCurrentMonthData.Premium +
      this.memberCurrentMonthData.InterestAmount;
    await this.firestore.collection('associationTable').doc('table').update({
      TotalBalance: newTotalBalance,
      AvailableBalance: newAvailableBalance,
    });
    await this.firestore.collection('associationTable').doc('table').update({
      TotalBalance: newTotalBalance,
      AvailableBalance: newAvailableBalance,
    });
  }
}
