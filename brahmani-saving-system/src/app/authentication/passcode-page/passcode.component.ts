import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { encryptData, getUserDashboard } from 'src/app/general-settings/static/HelperFunctions';

@Component({
  selector: 'app-page',
  templateUrl: './passcode.component.html',
  styleUrls: ['./passcode.component.scss'],
})
export class PasscodeComponent implements OnInit {
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private cookieService: CookieService
  ) {
    this.loginForm = this.createForm();
  }
  currentId = '';
  loginForm: any;
  firstPasscodeForm: any;
  isFirstPasscode: boolean = true;
  isValuesSame: boolean = true;
  submitted: boolean = false;

  ngOnInit(): void {
    document.getElementById('1')?.focus()
  }

  createForm() {
    return this.formBuilder.group({
      one: ['', [Validators.required, Validators.maxLength(1)]],
      two: ['', [Validators.required, Validators.maxLength(1)]],
      three: ['', [Validators.required, Validators.maxLength(1)]],
      four: ['', [Validators.required, Validators.maxLength(1)]],
    });
  }
  onCreatePasscode() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    if (this.isFirstPasscode) this.firstPasscodeSubmit();
    else this.secondPasscodeSubmit();
  }
  firstPasscodeSubmit() {
    this.submitted = false;
    this.isFirstPasscode = false;
    this.firstPasscodeForm = this.loginForm;
    this.loginForm = this.createForm();
    document.getElementById('1')?.focus()
  }
  secondPasscodeSubmit() {
   
    var passcodeOne:string = this.getValue(this.firstPasscodeForm.value)
    var passcodeTwo:string = this.getValue(this.loginForm.value)
    console.log(passcodeOne+" "+passcodeTwo);
    if (this.checkFormValues(passcodeOne,passcodeTwo)) {
      ///saving cookies
      
      this.cookieService.set('passcode', encryptData(passcodeOne), { expires: 30 });
      var getDashboard:string = getUserDashboard(this.cookieService)
      console.log(getDashboard);
      this.router.navigate([getDashboard]);
    } else {
      this.isValuesSame = false;
    }
  }
  getValue(form:any):string{
    var v1 = form.one + "";
    var v2 = form.two + "";
    var v3 = form.three + "";
    var v4 = form.four + "";

    var passcode =
    v1.charAt(v1.length-1) + "" +
    v2.charAt(v2.length-1) + "" +
    v3.charAt(v3.length-1) + "" +
    v4.charAt(v4.length-1);
    return passcode;
  }
  checkFormValues(passcodeOne:string, passcodeTwo:string) {
    return passcodeOne == passcodeTwo;
  }
  get form() {
    return this.loginForm.controls;
  }
  @HostListener('input', ['$event.target']) onInput(input: any) {
    if (input.value.length > 1) {
      input.value = input.value[1];
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
      else this.secondPasscodeSubmit();
    }
    if (field) {
      field.focus();
    }
  }
  onFocus(id: string) {
    this.currentId = id;
  }
  OnForgotPasscode() {
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
    else this.secondPasscodeSubmit();
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
