import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from 'src/app/general-settings/services/authentication.service';
import {
  encryptData,
  getCryptpoKey,
} from 'src/app/general-settings/static/HelperFunctions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  passwordType: string = 'password';
  isShowPassword: boolean = false;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    @Inject(AuthenticationService)
    public authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    if (this.cookieService.check('userMobileNumber')) {
      this.router.navigate(['login-passcode']);
    }
    this.loginForm = this.formBuilder.group({
      mmobile: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
        ],
      ],
      password: ['', [Validators.required, Validators.maxLength(10)]],
    });
  }
  onForgotPassword() {
    this.router.navigate(['forgot-password']);
  }
  togglePassword() {
    this.isShowPassword = !this.isShowPassword;
    if (this.isShowPassword) this.passwordType = 'text';
    else this.passwordType = 'password';
  }
  async onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) return;

    await this.authenticationService.requestLogin(
      this.loginForm.value.mmobile,
      this.loginForm.value.password
    );
    if (this.authenticationService.isWrongCredentials) return;
    this.cookieService.set('userMobileNumber', this.loginForm.value.mmobile, {
      expires: 30,
    });
    const encryptedUserCredentials = encryptData(
      JSON.stringify({
        PhoneNumber: this.loginForm.value.mmobile,
        Password: this.loginForm.value.password,
      })
    );
    this.cookieService.set('userCredentials', encryptedUserCredentials, {
      expires: 30,
    });
    this.router.navigate(['create-passcode']);
  }
  get form() {
    return this.loginForm.controls;
  }
}
