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
  getNextMonth,
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
  isEmployeeRemoved: boolean = false;
  isMemberDetailsArrayAdded: boolean = false;
  isAssociationDetailsUpdated: boolean = false;
  isAssociationMonthlyDataAdded: boolean = false;
  isMemberDetailsLoaded: boolean = false;
  isNextMonthStarted: boolean = false;
  isLoanEntryAdded: boolean = false;
  memberList: Array<MemberData> = [];
  searchedMemberList: Array<MemberData> = [];
  newMember!: MemberData;
  associationDetals!: AssociationData;
  associationMontlyData!: AssociationMontlyData;
  memberDetails!: MemberData;
  memberMontlyData!: UserMonthlyData;

  isAdmin() {
    if (getCurrentUserType(this.cookieService) == 'Admin') {
      return true;
    } else return false;
  }
  async addNewEmployee(newMemberData: any) {
    console.log(newMemberData);
    this.isEmployeeAdded = false;
    var memberList: Array<MemberData> = JSON.parse(
      decryptData(this.cookieService.get('memberList'))
    );
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
    await this.firestore
      .collection('memberTable')
      .doc(newMemberData.PhoneNumber)
      .set(newMemberData);
    var data: AssociationData = await this.helpService.getAssociationData();
    var newShares =
      parseInt(data.Shares.toString()) + parseInt(newMemberData.Shares);
    var newMembers = parseInt(data.TotalMembers.toString()) + 1;
    await this.firestore
      .collection('associationTable')
      .doc('table')
      .update({ Shares: newShares, TotalMembers: newMembers });
    this.isEmployeeAdded = true;

    await this.firestore
      .collection('login')
      .doc(newMemberData.PhoneNumber)
      .set({
        PhoneNumber: newMemberData.PhoneNumber,
        Password: newMemberData.PhoneNumber,
      });
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
  async removeEmployee(email: string) {
    this.isEmployeeRemoved = false;
    var body = RemoveEmployeeBodyRequest(email);
    const headers = {};
    await this.http
      .delete(remove_employee, { headers: headers, body: body })
      .toPromise()
      .then((data) => {
        var json = JSON.parse(JSON.stringify(data));
        this.isEmployeeRemoved = true;
      })
      .catch((error) => {
        this.isEmployeeRemoved = false;
      });
  }
  async getAllMemberDetails() {
    this.isMemberDetailsArrayAdded = false;
    this.memberList = await this.helpService.getAllMemberData();
    const encryptedUserCredentials = encryptData(
      JSON.stringify(this.memberList)
    );
    this.cookieService.set('memberList', encryptedUserCredentials, {
      expires: 30,
    });
    this.searchedMemberList = this.memberList;
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

  async getAssociationMontlyData() {
    console.log(this.isAssociationMonthlyDataAdded);
    this.isAssociationMonthlyDataAdded = false;
    this.associationMontlyData = {
      TotalInterestRecieved: 0,
      TotalPenaltyRecieved: 0,
      TotalPremiumRecieved: 0,
      PremiumRemainingPhoneNumbers: [],
    };

    await this.firestore
      .collection('monthlyUserData/2023/Nov')
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
      };
    console.log(this.memberMontlyData);
  }

  async startNextMonth() {
    this.isNextMonthStarted = false;
    this.associationDetals = await this.helpService.getAssociationData();
    if (this.associationDetals == null) return;
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
      await this.addMemberInNexMonth(this.memberList[i], nextYear, nextMonth);
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

  async addLoanEntry(memberDetails: MemberData, LoanAmount: number) {
    this.isLoanEntryAdded = false;
    this.associationDetals = await this.helpService.getAssociationData();
    if (this.associationDetals.AvailableBalance < LoanAmount) {
      return;
    }
    await this.firestore
      .collection('associationTable')
      .doc('table')
      .update({
        LoanAmount:
          parseInt(this.associationDetals.LoanAmount.toString()) + LoanAmount,
        AvailableBalance: this.associationDetals.AvailableBalance - LoanAmount,
      });
    await this.firestore
      .collection('memberTable')
      .doc(memberDetails.PhoneNumber)
      .update({ LoanAmount: memberDetails.LoanAmount + LoanAmount });
  }
}
