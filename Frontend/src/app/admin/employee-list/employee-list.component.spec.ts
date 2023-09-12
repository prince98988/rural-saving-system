import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminService } from 'src/app/general-settings/services/admin.service';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';

import { EmployeeListComponent } from './employee-list.component';

describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;
  const rout:Routes=[
    {
      path: 'add-employee',
      component: AddEmployeeComponent
    }
  ]
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule, RouterTestingModule.withRoutes(rout)],
      declarations: [ EmployeeListComponent ],
      providers:[AdminService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('openRemoveEmployeePopup should set removeEmployeeStyle to be flex', () => {
    component.openRemoveEmployeePopup();
    expect(component.removeEmployeeStyle).toBe('flex');
  });
  it('closeRemoveEmployeePopup should set removeEmployeeStyle to be none', () => {
    component.closeRemoveEmployeePopup();
    expect(component.removeEmployeeStyle).toBe('none');
  });
  it('openErrorPopup should set somethingWentWrongStyle to be flex', () => {
    component.openErrorPopup();
    expect(component.somethingWentWrongStyle).toBe('flex');
  });
  it('closeErrorPopup should set somethingWentWrongStyle to be none', () => {
    component.closeErrorPopup();
    expect(component.somethingWentWrongStyle).toBe('none');
  });
  it('should navigate to addEmployee', () => {
    component.addEmployee();
  });
  it('removeEmployeeEntry should remove employee correctly', () => {
    component.removeEmployeeEntry();
  });
});
