import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HelpService } from 'src/app/general-settings/services/help.service';
import {
  decryptData,
  getUserDashboard,
} from 'src/app/general-settings/static/HelperFunctions';

@Component({
  selector: 'app-passcode-login',
  templateUrl: './passcode-login.component.html',
  styleUrls: ['./passcode-login.component.scss'],
})
export class PasscodeLoginComponent implements OnInit {
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    private helpService: HelpService
  ) {
    this.loginForm = this.createForm();
  }

  currentId = '';
  loginForm: any;
  firstPasscodeForm: any;
  isFirstPasscode: boolean = true;
  isValuesSame: boolean = true;
  submitted: boolean = false;
  isWrongPasscode: boolean = false;

  ngOnInit(): void {}

  createForm() {
    return this.formBuilder.group({
      one: ['', [Validators.required, Validators.maxLength(1)]],
      two: ['', [Validators.required, Validators.maxLength(1)]],
      three: ['', [Validators.required, Validators.maxLength(1)]],
      four: ['', [Validators.required, Validators.maxLength(1)]],
    });
  }
  async onCreatePasscode() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    if (this.cookieService.check('passcode')) {
      var v1 = this.loginForm.value.one + '';
      var v2 = this.loginForm.value.two + '';
      var v3 = this.loginForm.value.three + '';
      var v4 = this.loginForm.value.four + '';

      var passcode =
        v1.charAt(v1.length - 1) +
        '' +
        v2.charAt(v2.length - 1) +
        '' +
        v3.charAt(v3.length - 1) +
        '' +
        v4.charAt(v4.length - 1);
      console.log(passcode);
      var savedPasscode = decryptData(this.cookieService.get('passcode'));
      if (passcode == savedPasscode) {
        this.router.navigate(['dashboard-reader']);
      } else this.isWrongPasscode = true;
    } else {
      this.router.navigate(['login']);
    }
  }

  get form() {
    return this.loginForm.controls;
  }

  @HostListener('input', ['$event.target']) onInput(input: any) {
    if (input.value.length > 1) {
      input.value = input.value.charAt(input.value.length - 1);
    }
    var field: any;
    if (input.value == '') {
      if (this.currentId != '1') {
        let cId = +this.currentId;
        let strId = (cId - 1).toString();
        field = document.getElementById(strId);
      }
    } else {
      if (this.currentId != '4') {
        let cId = +this.currentId;
        let strId = (cId + 1).toString();
        field = document.getElementById(strId);
      }
    }
    if (field) {
      field.focus();
    }
  }
  onFocus(id: string) {
    this.currentId = id;
  }
  onForgotPasscode() {
    this.cookieService.deleteAll();
    this.router.navigate(['login']);
  }
  onPrev() {
    var field: any;
    if (this.currentId != '1') {
      let cId = +this.currentId;
      let strId = (cId - 1).toString();
      field = document.getElementById(strId);
    }
    if (field) {
      field.focus();
    }
  }
  onNext() {
    var field: any;
    if (this.currentId != '4') {
      let cId = +this.currentId;
      let strId = (cId + 1).toString();
      field = document.getElementById(strId);
    }
    if (field) {
      field.focus();
    }
  }
  onKey(event: any) {
    if (
      event.key != 'Enter' &&
      event.key != 'ArrowLeft' &&
      event.key != 'ArrowRight'
    )
      return;
    if (event.key == 'Enter' || event.key == 'ArrowRight') this.onNext();
    else this.onPrev();
  }
}
