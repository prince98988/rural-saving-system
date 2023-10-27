import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/general-settings/services/admin.service';

@Component({
  selector: 'app-update-member',
  templateUrl: './update-member.component.html',
  styleUrls: ['./update-member.component.scss'],
})
export class UpdateMemberComponent {
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
      mmobile: [
        this.adminService.SelectedMemberData.PhoneNumber,
        [Validators.required, Validators.minLength(10)],
      ],
      firstname: [
        this.adminService.SelectedMemberData.FirstName,
        [Validators.required],
      ],
      lastname: [
        this.adminService.SelectedMemberData.LastName,
        [Validators.required],
      ],
      middlename: [
        this.adminService.SelectedMemberData.MiddleName,
        [Validators.required],
      ],
      shares: [
        this.adminService.SelectedMemberData.Shares,
        [Validators.required],
      ],
      type: [this.adminService.SelectedMemberData.Role, [Validators.required]],
      activestatus: [
        this.adminService.SelectedMemberData.ActiveStatus,
        [Validators.required],
      ],
      premiumpaid: [
        {
          value: this.adminService.SelectedMemberData.PremiumPaid,
          disabled: true,
        },
        [Validators.required],
      ],
      penaltypaid: [
        {
          value: this.adminService.SelectedMemberData.TotalPenaltyPaid,
          disabled: true,
        },
        [Validators.required],
      ],
      interestpaid: [
        {
          value: this.adminService.SelectedMemberData.InterestPaid,
          disabled: true,
        },
        [Validators.required],
      ],
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
    var updatedMember: any = {
      FirstName: this.addEmployeeForm.value.firstname,
      LastName: this.addEmployeeForm.value.lastname,
      MiddleName: this.addEmployeeForm.value.middlename,
      PhoneNumber: this.addEmployeeForm.value.mmobile,
      Shares: parseInt(this.addEmployeeForm.value.shares),
      Role: this.addEmployeeForm.value.type,
      InterestPaid: this.adminService.SelectedMemberData.InterestPaid,
      PremiumPaid: this.adminService.SelectedMemberData.PremiumPaid,
      LoanAmount: this.adminService.SelectedMemberData.LoanAmount,
      TotalPenaltyPaid: this.adminService.SelectedMemberData.TotalPenaltyPaid,
      ActiveStatus: this.addEmployeeForm.value.activestatus,
    };
    await this.adminService.UpdateMemberData(updatedMember);
    this.closeLoadingPopup();
    if (this.adminService.isMemberUpdated) this.openDonePopup();
    else this.openErrorPopup();
  }
  get form() {
    return this.addEmployeeForm.controls;
  }

  goBackToDashboard() {
    this.router.navigate(['manage-members']);
  }
}
