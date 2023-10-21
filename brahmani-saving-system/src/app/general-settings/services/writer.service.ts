import { HttpClient } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  decryptData,
  getCurrentUserName,
  getCurrentUserType,
  hideCardAnimation,
  makeCardAnimation,
} from '../static/HelperFunctions';
import {
  AssociationData,
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
  membersMonthlyDetails: Array<UserCurrentMonthData> = [];
  searchedMembersMonthlyDetails: Array<UserCurrentMonthData> = [];
  memberCurrentMonthData!: UserCurrentMonthData;
  associationData!: AssociationData;
  currentUserData!: MemberData;

  isWriter() {
    var userType = getCurrentUserType(this.cookieService);
    if (userType == 'admin' || userType == 'writer') {
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
    this.associationData = await this.helpService.getAssociationData();
    if (this.associationData == null) return;
    await this.firestore
      .collection(
        'monthlyUserData/' +
          this.associationData.CurrentYear +
          '/' +
          this.associationData.CurrentMonth
      )
      .get()
      .forEach((collection) => {
        collection.docs.find((document) => {
          var json = JSON.parse(JSON.stringify(document.data()));
          this.membersMonthlyDetails.push(json);
        });
      });
    console.log(this.membersMonthlyDetails);
    var memberData: Array<MemberData> =
      await this.helpService.getAllMemberData();
    console.log(memberData);
    if (memberData != null) {
      for (var index = 0; index < this.membersMonthlyDetails.length; index++) {
        memberData.find((memberData) => {
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
    if (this.associationData == null)
      this.associationData = await this.helpService.getAssociationData();
    if (this.currentUserData == null)
      this.currentUserData = await this.helpService.getCurrentMemberData(
        this.memberCurrentMonthData.PhoneNumber
      );
    await this.firestore
      .collection(
        'monthlyUserData/' +
          this.associationData.CurrentYear +
          '/' +
          this.associationData.CurrentMonth
      )
      .doc(this.memberCurrentMonthData.PhoneNumber)
      .update({
        InterestStatus: true,
        PremiumStatus: true,
        PenaltyPaid: penalty,
        PaidToPersonMobile: this.currentUserData.PhoneNumber,
        PaidToPersonName: this.currentUserData.FirstName,
      });

    var data = await this.helpService.getAssociationData();
    var newPenalty =
      parseInt(penalty.toString()) - this.memberCurrentMonthData.PenaltyPaid;
    var newTotalBalance =
      parseInt(data.TotalBalance) +
      this.memberCurrentMonthData.Premium +
      this.memberCurrentMonthData.InterestAmount +
      newPenalty;
    console.log(parseInt(data.TotalBalance));
    console.log(newTotalBalance);
    var newAvailableBalance =
      parseInt(data.AvailableBalance) +
      this.memberCurrentMonthData.Premium +
      newPenalty;
    var penaltyAmount = newPenalty + parseInt(data.PenaltyAmount);
    await this.firestore.collection('associationTable').doc('table').update({
      TotalBalance: newTotalBalance,
      AvailableBalance: newAvailableBalance,
      PenaltyAmount: penaltyAmount,
    });

    var updateMemberData = await this.helpService.getMemberDetails(
      this.memberCurrentMonthData.PhoneNumber
    );
    await this.firestore
      .collection('memberTable')
      .doc(this.memberCurrentMonthData.PhoneNumber)
      .update({
        PremiumPaid:
          updateMemberData.PremiumPaid + this.memberCurrentMonthData.Premium,
        InterestPaid:
          updateMemberData.InterestPaid +
          this.memberCurrentMonthData.InterestAmount,
        TotalPenaltyPaid:
          parseInt(updateMemberData.TotalPenaltyPaid.toString()) + newPenalty,
      });
  }
}
