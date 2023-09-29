import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserCurrentMonthData } from 'src/app/general-settings/Types/ReaderTypes';
import { WriterService } from 'src/app/general-settings/services/writer.service';
import { encryptData } from 'src/app/general-settings/static/HelperFunctions';

@Component({
  selector: 'app-writer-dashboard',
  templateUrl: './writer-dashboard.component.html',
  styleUrls: ['./writer-dashboard.component.scss'],
})
export class WriterDashboardComponent implements OnInit {
  removeEmployeeStyle = 'none';
  somethingWentWrongStyle: string = 'none';
  settingsPopUpStyle: string = 'none';
  selectedUserName: string = '';
  selectedUserEmail: string = '';
  loadingDisplayStyle: string = 'none';
  searchForm!: FormGroup;
  searchText: string = '';
  constructor(
    private router: Router,
    @Inject(WriterService)
    public writerService: WriterService,
    private formBuilder: FormBuilder,
    private cookieService: CookieService
  ) {
    this.getAllMember();
  }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchText: ['', []],
    });
  }

  async getAllMember() {
    await this.writerService.getAllMembersMontlyDetails();
  }

  onSelectedMember(memberCurrentMonthData: UserCurrentMonthData) {
    const encryptedUserCredentials = encryptData(
      JSON.stringify({
        memberCurrentMonthData,
      })
    );
    this.cookieService.set('memberCurrentMonthData', encryptedUserCredentials, {
      expires: 30,
    });
    this.router.navigate(['add-montly-entry']);
  }
}
