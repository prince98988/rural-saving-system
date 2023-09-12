import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from 'src/app/general-settings/services/authentication.service';
import { encryptData, getCryptpoKey } from 'src/app/general-settings/static/HelperFunctions';

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
    if (this.cookieService.check('passcode')) {
      this.router.navigate(['login-passcode']);
    }
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
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
      this.loginForm.value.email,
      this.loginForm.value.password
    );
    if(this.authenticationService.isWrongCredentials) return;
    const encryptedUserType = encryptData(this.authenticationService.loginResponse.employeeType.toString())
    this.cookieService.set('userType', encryptedUserType, { expires: 30 });
    this.cookieService.set('userName', this.authenticationService.loginResponse.name.toString(), { expires: 30 });
    this.cookieService.set('userEmail', this.loginForm.value.email, { expires: 30 });
    this.router.navigate(['create-passcode']);
  }
  get form() {
    return this.loginForm.controls;
  }
}
