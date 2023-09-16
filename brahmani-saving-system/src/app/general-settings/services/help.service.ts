import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class HelpService {
  constructor(
    private firestore: AngularFirestore,
    private cookieService: CookieService
  ) {}

  async getUserData(mmobile: string) {
    //get user data
    var userData = null;
    var list: any[] = [];
    await this.firestore
      .collection('memberTable')
      .get()
      .forEach((collection) => {
        var response = collection.docs.find((document) => {
          console.log(document.data());
          var json = JSON.parse(JSON.stringify(document.data()));
          list.push(json);
        });
      });
    list.forEach((user) => {
      if (user.PhoneNumber == mmobile) {
        userData = user;
      }
    });

    this.cookieService.set('userData', JSON.stringify(userData), {
      expires: 1,
    });

    if (userData != null) {
      list = [];
      //get assiciation data
      await this.firestore
        .collection('associationTable')
        .get()
        .forEach((collection) => {
          var response = collection.docs.find((document) => {
            console.log(document.data());
            var json = JSON.parse(JSON.stringify(document.data()));
            list.push(json);
          });
        });
      var associationData = list[0];
      this.cookieService.set(
        'associationData',
        JSON.stringify(associationData),
        {
          expires: 1,
        }
      );
    }
    console.log(this.cookieService.get('userData'));
    console.log(this.cookieService.get('associationData'));
    if (userData != null) return JSON.parse(JSON.stringify(userData)).Role;
    else return 'Unknown';
  }
}
