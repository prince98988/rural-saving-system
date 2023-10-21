import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
export class AddMontlyEntryComponent implements OnInit {
  penaltyForm!: FormGroup;
  constructor(
    private router: Router,
    @Inject(HelpService)
    public helpService: HelpService,
    public formBuilder: FormBuilder,
    @Inject(WriterService)
    public writerService: WriterService
  ) {
    this.writerService.getCurrentMonthData();
  }

  ngOnInit(): void {
    this.penaltyForm = this.formBuilder.group({
      penalty: [this.writerService.memberCurrentMonthData.PenaltyPaid, []],
    });
    console.log(this.writerService.memberCurrentMonthData);
  }
  async onAddEntry() {
    console.log(this.penaltyForm.value.penalty);
    await this.writerService.AddMemberMontlyEntry(
      this.penaltyForm.value.penalty
    );
    this.router.navigate(['dashboard-writer']);
  }
  goBackToWriterDashboard() {
    this.router.navigate(['dashboard-writer']);
  }
}
