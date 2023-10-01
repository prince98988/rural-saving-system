import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MemberData } from 'src/app/general-settings/Types/ReaderTypes';
import { AdminService } from 'src/app/general-settings/services/admin.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent implements OnInit {
  addEmployeeForm!: FormGroup;
  submitted = false;
  doneDisplayStyle: string = 'none';
  somethingWentWrongStyle: string = 'none';
  loadingDisplayStyle: string = 'none';
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    @Inject(AdminService)
    public adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.addEmployeeForm = this.formBuilder.group({
      mmobile: ['', [Validators.required, Validators.minLength(10)]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      middlename: ['', [Validators.required]],
      shares: [0, []],
      type: ['reader', [Validators.required]],
    });
  }
  openDonePopup() {
    this.doneDisplayStyle = 'flex';
  }
  closeDonePopup() {
    this.doneDisplayStyle = 'none';
    this.router.navigate(['manage-members']);
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
  async onSubmit() {
    this.submitted = true;
    if (this.addEmployeeForm.invalid) {
      return;
    }
    this.openLoadingPopup();
    var newMember: any = {
      FirstName: this.addEmployeeForm.value.firstname,
      LastName: this.addEmployeeForm.value.lastname,
      MiddleName: this.addEmployeeForm.value.middlename,
      PhoneNumber: this.addEmployeeForm.value.mmobile,
      Shares: this.addEmployeeForm.value.shares,
      Role: this.addEmployeeForm.value.type,
      InterestPaid: 0,
      PremiumPaid: 0,
      LoanAmount: 0,
      TotalPenaltyPaid: 0,
    };
    await this.adminService.addNewEmployee(newMember);
    this.closeLoadingPopup();
    if (this.adminService.isEmployeeAdded) this.openDonePopup();
    else this.openErrorPopup();
  }
  get form() {
    return this.addEmployeeForm.controls;
  }
}
