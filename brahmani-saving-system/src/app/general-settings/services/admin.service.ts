import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {
  AddEmployeeBodyRequest,
  RemoveEmployeeBodyRequest
} from '../static/Body';
import { getCurrentUserType } from '../static/HelperFunctions';
import { add_New_employee, get_all_employee, remove_employee, update_employee } from '../static/Urls';
import { EmployeeResponseArray } from '../Types/AdminType';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {}
  isEmployeeAdded: boolean = false;
  isEmployeeRemoved: boolean = false;
  isEmployeeResponseArrayAdded: boolean = false;
  employeeResponseArray: EmployeeResponseArray = [];

  isAdmin() {
    if (
     getCurrentUserType(this.cookieService) == 'Admin'
    ) {
      return true;
    } else return false;
  }
  async addNewEmployee(email: string, name: string, type: string) {
    this.isEmployeeAdded = false;
    var body = AddEmployeeBodyRequest(email, name, type);
    const headers = {};
    await this.http
      .put(add_New_employee, body, { headers })
      .toPromise()
      .then((data) => {
        var json = JSON.parse(JSON.stringify(data));
        this.isEmployeeAdded = true;
      })
      .catch((error) => {
        this.isEmployeeAdded = false;
      });
  }
  async removeEmployee(email: string) {
    this.isEmployeeRemoved = false;
    var body = RemoveEmployeeBodyRequest(email);
    const headers = {};
    await this.http
      .delete(remove_employee,{ headers: headers, body: body })
      .toPromise()
      .then((data) => {
        var json = JSON.parse(JSON.stringify(data));
        this.isEmployeeRemoved = true;
      })
      .catch((error) => {
        this.isEmployeeRemoved = false;
      });
  }
  async getAllEmployee() {
    this.isEmployeeResponseArrayAdded = false;
    const headers = {};
    await this.http
      .get(get_all_employee, { headers })
      .toPromise()
      .then((data) => {
        this.employeeResponseArray = JSON.parse(JSON.stringify(data));
        this.isEmployeeResponseArrayAdded = true;
      })
      .catch((error) => {
        this.isEmployeeResponseArrayAdded = false;
      });
  }
}
