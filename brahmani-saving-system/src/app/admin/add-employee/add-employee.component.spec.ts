import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminService } from 'src/app/general-settings/services/admin.service';
import { EmployeeListComponent } from '../employee-list/employee-list.component';

import { AddEmployeeComponent } from './add-employee.component';

describe('AddEmployeeComponent', () => {
  let component: AddEmployeeComponent;
  let fixture: ComponentFixture<AddEmployeeComponent>;
  const rout:Routes=[
    {
      path: 'manage-employee',
      component: EmployeeListComponent
    }
  ]
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[FormsModule, ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule.withRoutes(rout)],
      declarations: [ AddEmployeeComponent ],
      providers:[AdminService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('openDonePopup should set doneDisplayStyle to be flex', () => {
    component.openDonePopup();
    expect(component.doneDisplayStyle).toBe('flex');
  });
  it('closeDonePopup should set doneDisplayStyle to be none', () => {
    component.closeDonePopup();
    expect(component.doneDisplayStyle).toBe('none');
  });
  it('openErrorPopup should set somethingWentWrongStyle to be flex', () => {
    component.openErrorPopup();
    expect(component.somethingWentWrongStyle).toBe('flex');
  });
  it('closeErrorPopup should set somethingWentWrongStyle to be none', () => {
    component.closeErrorPopup();
    expect(component.somethingWentWrongStyle).toBe('none');
  });
  it('onsubmit', () => {
    component.onSubmit();
  });
});
