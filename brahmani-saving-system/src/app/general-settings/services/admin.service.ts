import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  AddEmployeeBodyRequest,
  RemoveEmployeeBodyRequest,
} from '../static/Body';
import {
  decryptData,
  encryptData,
  getCurrentUserType,
  getMonthInString,
  getNextMonth,
  getSelectedLanguage,
} from '../static/HelperFunctions';
import {
  add_New_employee,
  get_all_employee,
  remove_employee,
  update_employee,
} from '../static/Urls';
import { EmployeeResponseArray } from '../Types/AdminType';
import {
  AssociationData,
  AssociationMontlyData,
  MemberData,
  UserMonthlyData,
} from '../Types/ReaderTypes';
import { HelpService } from './help.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router,
    private helpService: HelpService,
    private firestore: AngularFirestore
  ) {}
  isEmployeeAdded: boolean = false;
  isMemberUpdated: boolean = false;
  isEmployeeRemoved: boolean = false;
  isMemberDetailsArrayAdded: boolean = false;
  isAssociationDetailsUpdated: boolean = false;
  isAssociationMonthlyDataAdded: boolean = false;
  isMemberDetailsLoaded: boolean = false;
  isMemberMontlyDataLoaded: boolean = false;
  isNextMonthStarted: boolean = false;
  isLoanEntryAdded: boolean = false;
  appLanguage: string = getSelectedLanguage(this.cookieService);
  memberList: Array<MemberData> = [];
  searchedMemberList: Array<MemberData> = [];
  loanMemberList: Array<MemberData> = [];
  searchedLoanMemberList: Array<MemberData> = [];
  newMember!: MemberData;
  associationDetals!: AssociationData;
  associationMontlyData!: AssociationMontlyData;
  memberDetails!: MemberData;
  memberMontlyData!: UserMonthlyData;
  SelectedMemberData!: MemberData;

  isAdmin() {
    if (getCurrentUserType(this.cookieService) == 'admin') {
      return true;
    } else return false;
  }
  async addNewEmployee(newMemberData: any) {
    console.log(newMemberData);
    this.isEmployeeAdded = false;
    var memberList: Array<MemberData> =
      await this.helpService.getAllMemberData();
    var copyMember!: any;
    console.log(memberList);
    memberList.find((member) => {
      if (member.PhoneNumber == newMemberData.PhoneNumber) {
        copyMember = member;
      }
    });

    if (copyMember != null) {
      return;
    }
    var data: AssociationData = await this.helpService.getAssociationData();
    if (data == null) return;

    await this.firestore
      .collection('memberTable')
      .doc(newMemberData.PhoneNumber)
      .set(newMemberData);

    var newShares =
      parseInt(data.Shares.toString()) + parseInt(newMemberData.Shares);
    var newMembers = parseInt(data.TotalMembers.toString()) + 1;
    var AvailableBalance =
      parseInt(data.AvailableBalance.toString()) +
      parseInt(newMemberData.PremiumPaid) +
      parseInt(newMemberData.InterestPaid) +
      parseInt(newMemberData.TotalPenaltyPaid);
    var TotalBalance =
      parseInt(data.TotalBalance.toString()) +
      parseInt(newMemberData.PremiumPaid) +
      parseInt(newMemberData.InterestPaid) +
      parseInt(newMemberData.TotalPenaltyPaid);
    var PenaltyAmount =
      parseInt(data.PenaltyAmount.toString()) +
      parseInt(newMemberData.TotalPenaltyPaid);
    await this.firestore.collection('associationTable').doc('table').update({
      Shares: newShares,
      TotalMembers: newMembers,
      AvailableBalance: AvailableBalance,
      TotalBalance: TotalBalance,
      PenaltyAmount: PenaltyAmount,
    });
    this.isEmployeeAdded = true;

    await this.firestore
      .collection('login')
      .doc(newMemberData.PhoneNumber)
      .set({
        PhoneNumber: newMemberData.PhoneNumber,
        Password: newMemberData.PhoneNumber,
      });
  }

  async UpdateMemberData(updateMemberData: any) {
    console.log(updateMemberData);
    this.isMemberUpdated = false;
    var memberList: Array<MemberData> =
      await this.helpService.getAllMemberData();
    var copyMember: any = this.SelectedMemberData;
    if (copyMember == null) {
      return;
    }
    console.log(copyMember);
    await this.firestore
      .collection('memberTable')
      .doc(updateMemberData.PhoneNumber)
      .set(updateMemberData);
    var data: AssociationData = await this.helpService.getAssociationData();
    var newShares =
      parseInt(data.Shares.toString()) +
      parseInt(updateMemberData.Shares) -
      parseInt(copyMember.Shares.toString());
    var penaltyChange =
      parseInt(updateMemberData.TotalPenaltyPaid) -
      parseInt(copyMember.TotalPenaltyPaid.toString());
    var loanAmountChange =
      parseInt(updateMemberData.LoanAmount) -
      parseInt(copyMember.LoanAmount.toString());
    var dataChange =
      parseInt(updateMemberData.PremiumPaid) -
      parseInt(copyMember.PremiumPaid.toString()) +
      parseInt(updateMemberData.InterestPaid) -
      parseInt(copyMember.InterestPaid.toString()) +
      penaltyChange;
    var newTotalBalance = parseInt(data.TotalBalance.toString()) + dataChange;
    var newAvaliableBalance =
      parseInt(data.AvailableBalance.toString()) +
      dataChange -
      loanAmountChange;
    var newPenaltyAmount = parseInt(data.PenaltyAmount.toString()) + dataChange;
    var newLoanAmount = parseInt(data.LoanAmount.toString()) + loanAmountChange;

    await this.firestore.collection('associationTable').doc('table').update({
      Shares: newShares,
      TotalBalance: newTotalBalance,
      AvailableBalance: newAvaliableBalance,
      PenaltyAmount: newPenaltyAmount,
      LoanAmount: newLoanAmount,
    });
    this.isMemberUpdated = true;
  }

  async updateAssociationDetails(updatedData: any) {
    this.isAssociationDetailsUpdated = false;
    console.log(updatedData);
    await this.firestore
      .collection('associationTable')
      .doc('table')
      .update(updatedData);
    this.isAssociationDetailsUpdated = true;
  }
  async removeEmployee(phoneNumber: string) {
    this.isEmployeeRemoved = false;
    await this.firestore.collection('memberTable').doc(phoneNumber).delete();
    var associationData: AssociationData =
      await this.helpService.getAssociationData();
    var newTotalBalance =
      associationData.TotalBalance -
      this.SelectedMemberData.PremiumPaid -
      this.SelectedMemberData.InterestPaid -
      this.SelectedMemberData.TotalPenaltyPaid +
      this.SelectedMemberData.LoanAmount;
    var newAvailableBalance =
      associationData.AvailableBalance -
      this.SelectedMemberData.PremiumPaid -
      this.SelectedMemberData.InterestPaid -
      this.SelectedMemberData.TotalPenaltyPaid +
      this.SelectedMemberData.LoanAmount;
    var newLoanAmount =
      associationData.LoanAmount - this.SelectedMemberData.LoanAmount;
    var newPenaltyAmount =
      associationData.PenaltyAmount - this.SelectedMemberData.TotalPenaltyPaid;
    var newShares = associationData.Shares - this.SelectedMemberData.Shares;
    var newMembers = associationData.TotalMembers - 1;

    await this.firestore.collection('associationTable').doc('table').update({
      Shares: newShares,
      TotalBalance: newTotalBalance,
      AvailableBalance: newAvailableBalance,
      PenaltyAmount: newPenaltyAmount,
      LoanAmount: newLoanAmount,
      TotalMembers: newMembers,
    });
    this.isEmployeeRemoved = true;
  }
  async getAllMemberDetails() {
    this.isMemberDetailsArrayAdded = false;
    this.memberList = await this.helpService.getAllMemberData();
    this.searchedMemberList = this.memberList;
    this.isMemberDetailsArrayAdded = true;
  }

  async getAllLoanMemberDetails() {
    this.isMemberDetailsArrayAdded = false;
    this.getAssociationDetails();
    this.loanMemberList = await this.helpService.getAllMemberData();
    this.loanMemberList = this.loanMemberList.filter((member) => {
      return member.LoanAmount > 0;
    });

    this.searchedLoanMemberList = this.loanMemberList;
    this.isMemberDetailsArrayAdded = true;
  }

  async getAssociationDetails() {
    this.associationDetals = await this.helpService.getAssociationData();
    console.log(this.associationDetals.Name);
  }

  onSearchMemberList(text: any) {
    this.searchedMemberList = this.memberList.filter(
      (member) =>
        member.FirstName.indexOf(text) != -1 ||
        member.PhoneNumber.indexOf(text) != -1
    );
  }

  onSearchLoanMemberList(text: any) {
    this.searchedLoanMemberList = this.loanMemberList.filter(
      (member) =>
        member.FirstName.indexOf(text) != -1 ||
        member.PhoneNumber.indexOf(text) != -1
    );
  }

  async getAssociationMontlyData(month: string, year: string) {
    console.log(this.isAssociationMonthlyDataAdded);
    this.isAssociationMonthlyDataAdded = false;
    this.associationMontlyData = {
      TotalInterestRecieved: 0,
      TotalPenaltyRecieved: 0,
      TotalPremiumRecieved: 0,
      PremiumRemainingPhoneNumbers: [],
    };

    await this.firestore
      .collection('monthlyUserData/' + year + '/' + month)
      .get()
      .forEach((collection) => {
        collection.docs.find((document) => {
          var json = JSON.parse(JSON.stringify(document.data()));
          if (json.PremiumStatus) {
            this.associationMontlyData.TotalPremiumRecieved += json.Premium;
            this.associationMontlyData.TotalInterestRecieved +=
              json.InterestAmount;
            this.associationMontlyData.TotalPenaltyRecieved += json.PenaltyPaid;
          } else {
            this.associationMontlyData.PremiumRemainingPhoneNumbers.push(
              json.PhoneNumber
            );
          }
        });
      });
    console.log(this.associationMontlyData);
    this.isAssociationMonthlyDataAdded = true;
  }

  async getMemberDetails() {
    this.isMemberDetailsLoaded = false;
    this.memberDetails = JSON.parse(this.cookieService.get('memberDetails'));
    this.memberMontlyData = await this.helpService.getMemberMonthlyDetails(
      this.memberDetails.PhoneNumber,
      'Nov',
      '2023'
    );
    console.log(this.memberMontlyData);
    console.log(this.memberDetails);
    this.isMemberDetailsLoaded = true;
  }

  async getMemberMothlyDetails(month: string, year: string) {
    this.isMemberMontlyDataLoaded = false;
    this.memberMontlyData = await this.helpService.getMemberMonthlyDetails(
      this.memberDetails.PhoneNumber,
      month,
      year
    );

    if (this.memberMontlyData == undefined)
      this.memberMontlyData = {
        PhoneNumber: '',
        Premium: 0,
        PremiumStatus: false,
        LoanAmount: 0,
        InterestAmount: 0,
        InterestStatus: false,
        PenaltyPaid: 0,
        DateTime: new Date(),
        PaidToPersonMobile: '',
        PaidToPersonName: '',
      };
    console.log(this.memberMontlyData);
    this.isMemberMontlyDataLoaded = true;
  }

  async startNextMonth() {
    this.isNextMonthStarted = false;

    var currentMonth = getMonthInString(new Date().getMonth());
    this.associationDetals = await this.helpService.getAssociationData();
    if (this.associationDetals == null) return;
    if (this.associationDetals.CurrentMonth != currentMonth) return;
    await this.getAllMemberDetails();
    this.memberList.find((member) => {
      member.NextMonthPremium =
        member.Shares * this.associationDetals.SharePrice;
      member.NextMonthInterest =
        member.LoanAmount * this.associationDetals.InterestRate;
    });
    console.log(this.memberList);

    var nextMonth = getNextMonth(this.associationDetals.CurrentMonth);
    var nextYear = parseInt(this.associationDetals.CurrentYear);
    if (nextMonth == 'Jan') nextYear += 1;

    for (var i = 0; i < this.memberList.length; i++) {
      if (this.memberList[i].ActiveStatus == 'active') {
        await this.addMemberInNexMonth(this.memberList[i], nextYear, nextMonth);
      }
    }

    this.associationDetals.CurrentMonth = nextMonth;
    this.associationDetals.CurrentYear = nextYear.toString();
    await this.updateAssociationDetails(this.associationDetals);
    this.isNextMonthStarted = true;
  }

  async addMemberInNexMonth(
    member: MemberData,
    nextYear: number,
    nextMonth: string
  ) {
    await this.firestore
      .collection('monthlyUserData/' + nextYear + '/' + nextMonth)
      .doc(member.PhoneNumber)
      .set({
        PhoneNumber: member.PhoneNumber,
        Premium: member.NextMonthPremium,
        PremiumStatus: false,
        LoanAmount: member.LoanAmount,
        InterestAmount: member.NextMonthInterest,
        InterestStatus: false,
        PenaltyPaid: 0,
        DateTime: null,
      });
  }

  async addLoanEntry(PhoneNumber: string, LoanAmount: number) {
    this.isLoanEntryAdded = false;
    LoanAmount = parseInt(LoanAmount.toString());
    var memberDetails!: MemberData;
    this.memberList.find((member) => {
      if (member.PhoneNumber == PhoneNumber) {
        memberDetails = member;
      }
    });
    if (memberDetails == null) {
      console.log('member Not found');
      return;
    }
    this.associationDetals = await this.helpService.getAssociationData();
    if (
      this.associationDetals.AvailableBalance < LoanAmount ||
      this.associationDetals.LoanAmountPerShare * memberDetails.Shares <
        LoanAmount + memberDetails.LoanAmount
    ) {
      console.log('loan amount greate than limit');
      return;
    }
    await this.firestore
      .collection('associationTable')
      .doc('table')
      .update({
        LoanAmount:
          parseInt(this.associationDetals.LoanAmount.toString()) + LoanAmount,
        AvailableBalance:
          parseInt(this.associationDetals.AvailableBalance.toString()) -
          LoanAmount,
      });

    var loanamount = parseInt(memberDetails.LoanAmount.toString()) + LoanAmount;
    console.log(loanamount);
    await this.firestore
      .collection('memberTable')
      .doc(memberDetails.PhoneNumber)
      .update({
        LoanAmount: loanamount,
      });

    this.isLoanEntryAdded = true;
  }

  switchLanguage() {
    if (this.appLanguage == 'English') {
      this.appLanguage = 'ગુજરાતી';
      this.cookieService.set('app-language', 'ગુજરાતી');
    } else {
      this.appLanguage = 'English';
      this.cookieService.set('app-language', 'English');
    }
  }
}
