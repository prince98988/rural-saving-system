import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  getCurrentMonthData() {
    this.memberCurrentMonthData = decryptData(
      this.cookieService.get('memberCurrentMonthData')
    );
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
            this.membersMonthlyDetails[index].PenaltyPaid =
              memberData.PenaltyPaid;
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
  async postVehicleEntry(vehicleType: string) {
    var body = CarEntryBodyRequest();
    if (vehicleType == 'Bike') body = BikeEntryBodyRequest();
    const headers = {};
    await this.http
      .put(post_vehicle_entry, body, { headers })
      .toPromise()
      .then((data) => {
        console.log('entry added');
        this.isVehicleAdded = true;
      })
      .catch((error) => {
        this.isVehicleAdded = false;
      });
  }
  async deleteVehicleEntry(timeStamp: string, vehicle: string) {
    var body = DeleteEntryBodyRequest(timeStamp, vehicle);
    const headers = GeneralHeader();
    await this.http
      .delete(delete_vehicle_entry, { headers: headers, body: body })
      .toPromise()
      .then((data) => {
        var json = JSON.parse(JSON.stringify(data));
        this.isVehicleDeleted = true;
      })
      .catch((error) => {
        this.isVehicleDeleted = false;
      });
  }
  async gelAllEntries() {
    this.isAllVehicleEntriesAdded = false;
    const headers = GeneralHeader();
    await this.http
      .get(gel_all_vehicle_entry, { headers: headers })
      .toPromise()
      .then((data) => {
        this.vehicleEntries = JSON.parse(JSON.stringify(data));
        this.isAllVehicleEntriesAdded = true;
      })
      .catch((error) => {
        this.isAllVehicleEntriesAdded = false;
      });
  }
}
