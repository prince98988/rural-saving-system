import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserCurrentMonthData } from 'src/app/general-settings/Types/ReaderTypes';
import { HelpService } from 'src/app/general-settings/services/help.service';
import { WriterService } from 'src/app/general-settings/services/writer.service';
import { decryptData } from 'src/app/general-settings/static/HelperFunctions';
import Cotter from 'cotter';

@Component({
  selector: 'app-add-montly-entry',
  templateUrl: './add-montly-entry.component.html',
  styleUrls: ['./add-montly-entry.component.scss'],
})
export class AddMontlyEntryComponent implements OnInit {
  penaltyForm!: FormGroup;
  submitted = false;
  doneDisplayStyle: string = 'none';
  somethingWentWrongStyle: string = 'none';
  loadingDisplayStyle: string = 'none';
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
      penalty: [
        this.writerService.memberCurrentMonthData.PenaltyPaid,
        [Validators.required],
      ],
    });
    console.log(this.writerService.memberCurrentMonthData);
  }
  async onAddEntry() {
    this.openLoadingPopup();
    this.submitted = true;
    console.log(this.penaltyForm.value.penalty);
    await this.writerService.AddMemberMontlyEntry(
      parseInt(this.penaltyForm.value.penalty)
    );
    this.submitted = false;

    this.closeLoadingPopup();
    if (this.writerService.isMonthlyEntryAdded) this.openDonePopup();
    else this.openErrorPopup();
  }

  get form() {
    return this.penaltyForm.controls;
  }
  goBackToWriterDashboard() {
    this.router.navigate(['dashboard-writer']);
  }

  openDonePopup() {
    this.doneDisplayStyle = 'flex';
  }
  closeDonePopup() {
    this.doneDisplayStyle = 'none';
    this.router.navigate(['dashboard-writer']);
  }
  openErrorPopup() {
    this.somethingWentWrongStyle = 'flex';
  }
  closeErrorPopup() {
    this.somethingWentWrongStyle = 'none';
  }
  openLoadingPopup() {
    this.loadingDisplayStyle = 'flex';
  }
  closeLoadingPopup() {
    this.loadingDisplayStyle = 'none';
  }
}
