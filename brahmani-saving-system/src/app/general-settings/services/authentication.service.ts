import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeneralHeader } from '../static/Haders';
import { login_with_email_password, update_employee } from '../static/Urls';
import { EmailValidator } from '@angular/forms';
import { LoginResponse } from '../Types/AuthenticationType';
import {
  LoginBodyRequest,
  UpdateUserCredentialsBodyRequest,
} from '../static/Body';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient, private firestore: AngularFirestore) {}
  isLoading = false;
  isWrongCredentials = false;
  isError = false;

  isUserCredentialsUpdated: boolean = false;
  loginResponse!: LoginResponse;

  async requestLogin(email: string, password: string) {
    this.isWrongCredentials = false;
  }
  async updateUserCredentials(email: string, password: string) {
    this.isLoading = true;
    this.isUserCredentialsUpdated = false;
    var body = UpdateUserCredentialsBodyRequest(email, password);
    const headers = {};
    await this.http
      .put(update_employee, body, { headers })
      .toPromise()
      .then((data) => {
        var json = JSON.parse(JSON.stringify(data));
        this.isUserCredentialsUpdated = true;
        this.isLoading = false;
      })
      .catch((error) => {
        this.isLoading = false;
        this.isUserCredentialsUpdated = false;
      });
  }
}
