import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from 'src/app/general-settings/services/authentication.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { LoginComponent } from './login.component';
import { Routes } from '@angular/router';
import { UpdatePasswordComponent } from '../update-password/update-password.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const rout:Routes=[
    {
      path: 'forgot-password',
      component: UpdatePasswordComponent
    }
  ]
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[FormsModule, ReactiveFormsModule, HttpClientTestingModule,RouterTestingModule.withRoutes(rout)],
      providers:[AuthenticationService],
      declarations: [ LoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('toggle password should set correct passwordType', () => {
    component.togglePassword()
    expect(component.passwordType).toBe("text");
    component.togglePassword()
    expect(component.passwordType).toBe("password");
  });
  it('on forgot password', () => {
    component.onForgotPassword()
  });
  it('onSubmit form', () => {
    component.onSubmit()
  });
  it('get from gives correct control', () => {
    let form = component.form
  });
});
