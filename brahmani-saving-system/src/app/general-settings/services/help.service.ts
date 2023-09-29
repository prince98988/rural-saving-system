import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CookieService } from 'ngx-cookie-service';
import { MemberData } from '../Types/ReaderTypes';

@Injectable({
  providedIn: 'root',
})
export class HelpService {
  constructor(
    private firestore: AngularFirestore,
    private cookieService: CookieService
  ) {}

  allMembersData: Array<MemberData> = [];

  async getAllMemberData() {
    await this.firestore
      .collection('memberTable')
      .get()
      .forEach((collection) => {
        collection.docs.find((document) => {
          console.log(document.data());
          var json = JSON.parse(JSON.stringify(document.data()));
          this.allMembersData.push(json);
        });
      });
    console.log(this.allMembersData);
    return this.allMembersData;
  }
}
