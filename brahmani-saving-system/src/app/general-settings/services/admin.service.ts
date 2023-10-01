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
} from '../static/HelperFunctions';
import {
  add_New_employee,
  get_all_employee,
  remove_employee,
  update_employee,
} from '../static/Urls';
import { EmployeeResponseArray } from '../Types/AdminType';
import { AssociationData, MemberData } from '../Types/ReaderTypes';
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
  isEmployeeResponseArrayAdded: boolean = false;
  memberList: Array<MemberData> = [];
  searchedMemberList: Array<MemberData> = [];
  newMember!: MemberData;

  isAdmin() {
    if (getCurrentUserType(this.cookieService) == 'Admin') {
      return true;
    } else return false;
  }
  async addNewEmployee(newMemberData: any) {
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
    await this.firestore.collection('memberTable').add(newMemberData);
    var data: AssociationData = await this.helpService.getAssociationData();
    var newShares =
      parseInt(data.Shares.toString()) + parseInt(newMemberData.Shares);
    await this.firestore
      .collection('associationTable')
      .doc('table')
      .update({ Shares: newShares });
    this.isEmployeeAdded = true;
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
    this.isEmployeeResponseArrayAdded = false;
    this.memberList = await this.helpService.getAllMemberData();
    const encryptedUserCredentials = encryptData(
      JSON.stringify(this.memberList)
    );
    this.cookieService.set('memberList', encryptedUserCredentials, {
      expires: 30,
    });
    this.searchedMemberList = this.memberList;
    this.isEmployeeResponseArrayAdded = false;
  }

  onSearchMemberList(text: any) {
    this.searchedMemberList = this.memberList.filter(
      (member) =>
        member.FirstName.indexOf(text) != -1 ||
        member.PhoneNumber.indexOf(text) != -1
    );
  }
}
