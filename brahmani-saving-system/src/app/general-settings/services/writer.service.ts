import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
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

@Injectable({
  providedIn: 'root',
})
export class WriterService {
  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.userName = getCurrentUserName(cookieService);
  }
  userName!: string;
  isDashBoardDetailsAdded = true;
  isVehicleAdded = true;
  isVehicleDeleted = true;
  isAllVehicleEntriesAdded = true;
  vehicleEntries: Array<Vehicle> = [];
  writerDashboardData!: WriterDashboardData;

  isWriter() {
    var userType = getCurrentUserType(this.cookieService);
    if (userType == 'Admin' || userType == 'Writer') {
      return true;
    } else return false;
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
  async getWriterDashboardDetails() {
    this.isDashBoardDetailsAdded = false
    const headers = {};
    await this.http
      .get(writer_dashboard_details, { headers })
      .toPromise()
      .then((data) => {
        this.writerDashboardData = JSON.parse(JSON.stringify(data));
        this.vehicleEntries = this.writerDashboardData.logs;
        this.isDashBoardDetailsAdded = true;
      })
      .catch((error) => {
        this.isDashBoardDetailsAdded = false;
      })
      .finally(()=>{
        this.hideLoader();
      })
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
