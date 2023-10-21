import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from 'src/app/general-settings/services/authentication.service';
import { getCurrentUserMobileNumber } from 'src/app/general-settings/static/HelperFunctions';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss'],
})
export class UpdatePasswordComponent implements OnInit {
  updatePasswordForm!: FormGroup;
  submitted = false;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    @Inject(AuthenticationService)
    public authenticationService: AuthenticationService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.updatePasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.maxLength(10)]],
      cpassword: ['', [Validators.required, Validators.maxLength(10)]],
    });
  }
  async onSubmit() {
    this.submitted = true;
    if (this.updatePasswordForm.invalid) {
      return;
    }
    await this.authenticationService.updateUserCredentials(
      getCurrentUserMobileNumber(this.cookieService),
      this.updatePasswordForm.value.password
    );
    if (this.authenticationService.isUserCredentialsUpdated)
      this.router.navigate(['dashboard-reader']);
  }

  get form() {
    return this.updatePasswordForm.controls;
  }
}
