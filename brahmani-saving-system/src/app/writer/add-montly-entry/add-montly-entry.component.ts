import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserCurrentMonthData } from 'src/app/general-settings/Types/ReaderTypes';
import { HelpService } from 'src/app/general-settings/services/help.service';
import { WriterService } from 'src/app/general-settings/services/writer.service';
import { decryptData } from 'src/app/general-settings/static/HelperFunctions';

@Component({
  selector: 'app-add-montly-entry',
  templateUrl: './add-montly-entry.component.html',
  styleUrls: ['./add-montly-entry.component.scss'],
})
export class AddMontlyEntryComponent {
  constructor(
    private router: Router,
    @Inject(HelpService)
    public helpService: HelpService,
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    public writerService: WriterService
  ) {}

  ngOnInit(): void {
    this.writerService.getCurrentMonthData();
    console.log(this.writerService.memberCurrentMonthData);
  }
}
