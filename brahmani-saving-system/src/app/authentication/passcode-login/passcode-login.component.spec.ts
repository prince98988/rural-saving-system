import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieService } from 'ngx-cookie-service';
import { LoginComponent } from '../login/login.component';

import { PasscodeLoginComponent } from './passcode-login.component';

describe('PasscodeLoginComponent', () => {
  let component: PasscodeLoginComponent;
  let fixture: ComponentFixture<PasscodeLoginComponent>;
  let cookieService:CookieService;
  const rout:Routes=[
    {
      path: 'login',
      component: LoginComponent
    }
  ]
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[FormsModule, ReactiveFormsModule, RouterTestingModule.withRoutes(rout)],
      declarations: [ PasscodeLoginComponent ]
    })
    .compileComponents();
    cookieService = TestBed.inject(CookieService);
    fixture = TestBed.createComponent(PasscodeLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('onCreatePasscode', () => {
    component.loginForm.value.one = '1'
    component.loginForm.value.two = '1'
    component.loginForm.value.three = '1'
    component.loginForm.value.four = '1'
    cookieService.set('passcode','1234')
    component.onCreatePasscode();
  });
  it('onFocus set current id', () => {
    component.onFocus('1');
    expect(component.currentId).toBe('1');
  });
  it('onForgotPasscode delete all cookies', () => {
    component.onForgotPasscode();
    expect(cookieService.check('passcode')).toBe(false);
  });
  it('onPrev go to prev id', () => {
    component.currentId = '4';
    component.onPrev();
    expect(component.currentId).toBe('3');
  });
  it('onNext go to next id', () => {
    component.currentId = '1';
    component.onNext();
    expect(component.currentId).toBe('2');
  });
});
