import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      type: ['Reader', [Validators.required]],
    });
  }
  openDonePopup() {
    this.doneDisplayStyle = 'flex';
  }
  closeDonePopup() {
    this.doneDisplayStyle = 'none';
    this.router.navigate(['manage-employee']);
  }
  openErrorPopup() {
    this.somethingWentWrongStyle = 'flex';
  }
  closeErrorPopup() {
    this.somethingWentWrongStyle = 'none';
  }
  openLoadingPopup() {
    this.loadingDisplayStyle = "flex";
  }
  closeLoadingPopup() {
    this.loadingDisplayStyle = "none";
  }
  async onSubmit() {
    this.submitted = true;
    if (this.addEmployeeForm.invalid) {
      return;
    }
    this.openLoadingPopup();
    await this.adminService.addNewEmployee(
      this.addEmployeeForm.value.email,
      this.addEmployeeForm.value.name,
      this.addEmployeeForm.value.type
    );
    this.closeLoadingPopup();
    if (this.adminService.isEmployeeAdded) this.openDonePopup();
    else this.openErrorPopup();
  }
  get form() {
    return this.addEmployeeForm.controls;
  }
}
