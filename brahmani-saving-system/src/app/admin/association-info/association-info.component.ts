import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/general-settings/services/admin.service';

@Component({
  selector: 'app-association-info',
  templateUrl: './association-info.component.html',
  styleUrls: ['./association-info.component.scss'],
})
export class AssociationInfoComponent {
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
  ) {
    this.getAssociationDetails();
  }

  async getAssociationDetails() {
    await this.adminService.getAssociationDetails();
    this.addEmployeeForm.setValue({
      name: this.adminService.associationDetals.Name,
      totalmembers: this.adminService.associationDetals.TotalMembers,
      shares: this.adminService.associationDetals.Shares,
      shareprice: this.adminService.associationDetals.SharePrice,
      totalbalance: this.adminService.associationDetals.TotalBalance,
      availablebalance: this.adminService.associationDetals.AvailableBalance,
      defaultpassword: this.adminService.associationDetals.DefaultPassword,
      interestrate: this.adminService.associationDetals.InterestRate,
      presidentname: this.adminService.associationDetals.PresidentName,
      startedmonth: this.adminService.associationDetals.StartedMonth,
      startedyear: this.adminService.associationDetals.StartedYear,
      loanamount: this.adminService.associationDetals.LoanAmount,
      penaltyamount: this.adminService.associationDetals.PenaltyAmount,
      currentmonth: this.adminService.associationDetals.CurrentMonth,
      currentyear: this.adminService.associationDetals.CurrentYear,
      loanamountpershare:
        this.adminService.associationDetals.LoanAmountPerShare,
    });
  }

  ngOnInit(): void {
    this.addEmployeeForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      totalmembers: [{ value: 0, disabled: true }, [Validators.required]],
      shares: [{ value: 0, disabled: true }, [Validators.required]],
      shareprice: [0, [Validators.required]],
      totalbalance: [{ value: 0, disabled: true }, [Validators.required]],
      presidentname: ['', [Validators.required]],
      interestrate: [0, [Validators.required]],
      defaultpassword: ['', [Validators.required]],
      availablebalance: [{ value: 0, disabled: true }, [Validators.required]],
      loanamount: [{ value: 0, disabled: true }, [Validators.required]],
      penaltyamount: [{ value: 0, disabled: true }, [Validators.required]],
      startedmonth: ['', [Validators.required]],
      startedyear: ['', [Validators.required]],
      currentmonth: [{ value: '', disabled: true }, [Validators.required]],
      currentyear: [{ value: '', disabled: true }, [Validators.required]],
      loanamountpershare: [0, [Validators.required]],
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
  async onSubmit() {
    console.log('-->');
    this.submitted = true;
    if (this.addEmployeeForm.invalid) {
      return;
    }
    this.openLoadingPopup();
    var updatedData: any = {
      Name: this.addEmployeeForm.value.name,
      PresidentName: this.addEmployeeForm.value.presidentname,
      SharePrice: this.addEmployeeForm.value.shareprice,
      InterestRate: this.addEmployeeForm.value.interestrate,
      DefaultPassword: this.addEmployeeForm.value.defaultpassword,
      LoanAmountPerShare: parseInt(
        this.addEmployeeForm.value.loanamountpershare
      ),
    };
    await this.adminService.updateAssociationDetails(updatedData);
    this.closeLoadingPopup();
    if (this.adminService.isAssociationDetailsUpdated) this.openDonePopup();
    else this.openErrorPopup();
  }
  get form() {
    return this.addEmployeeForm.controls;
  }

  goBackToDashboard() {
    this.router.navigate(['dashboard-admin']);
  }
}
