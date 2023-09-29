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
import { doc } from 'firebase/firestore';

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

  userData: any = null;
  associationData: any = null;

  async requestLogin(email: string, password: string) {
    this.isWrongCredentials = true;
    var list: any[] = [];
    await this.firestore
      .collection('login')
      .get()
      .forEach((collection) => {
        var response = collection.docs.find((document) => {
          console.log(document.data());
          var json = JSON.parse(JSON.stringify(document.data()));
          list.push(json);
        });
      });

    list.forEach((user) => {
      if (user.PhoneNumber == email && user.Password == password) {
        this.isWrongCredentials = false;
      }
    });
    console.log(this.isWrongCredentials);
  }
  async updateUserCredentials(mmobile: string, password: string) {
    this.isLoading = true;
    this.isUserCredentialsUpdated = false;
    await this.firestore
      .collection('login')
      .doc(mmobile)
      .update({ PhoneNumber: mmobile, Password: password });
    this.isLoading = false;
    this.isUserCredentialsUpdated = true;
  }
}
