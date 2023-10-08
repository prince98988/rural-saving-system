import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/general-settings/services/admin.service';

@Component({
  selector: 'app-loan-entry',
  templateUrl: './loan-entry.component.html',
  styleUrls: ['./loan-entry.component.scss'],
})
export class LoanEntryComponent implements OnInit {
  addLoanEntryForm!: FormGroup;
  submitted = false;
  doneDisplayStyle: string = 'none';
  somethingWentWrongStyle: string = 'none';
  loadingDisplayStyle: string = 'none';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    @Inject(AdminService)
    public adminService: AdminService
  ) {
    this.getAllMembers();
  }

  async getAllMembers() {
    await this.adminService.getAllMemberDetails();
  }
  ngOnInit(): void {
    this.addLoanEntryForm = this.formBuilder.group({
      phonenumber: [null, [Validators.required]],
      loanamount: [0, [Validators.required]],
    });
  }
  openDonePopup() {
    this.doneDisplayStyle = 'flex';
  }
  closeDonePopup() {
    this.doneDisplayStyle = 'none';
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
  get form() {
    return this.addLoanEntryForm.controls;
  }

  async onSubmit() {
    console.log(JSON.stringify(this.addLoanEntryForm.value.phonenumber));
    await this.adminService.addLoanEntry(
      this.addLoanEntryForm.value.phonenumber,
      this.addLoanEntryForm.value.loanamount
    );
  }
}
