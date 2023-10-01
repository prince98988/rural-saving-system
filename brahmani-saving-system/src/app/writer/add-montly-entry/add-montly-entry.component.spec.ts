import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMontlyEntryComponent } from './add-montly-entry.component';

describe('AddMontlyEntryComponent', () => {
  let component: AddMontlyEntryComponent;
  let fixture: ComponentFixture<AddMontlyEntryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMontlyEntryComponent],
    });
    fixture = TestBed.createComponent(AddMontlyEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
