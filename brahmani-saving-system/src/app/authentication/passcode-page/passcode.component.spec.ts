import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PasscodeComponent } from './passcode.component';

describe('PageComponent', () => {
  let component: PasscodeComponent;
  let fixture: ComponentFixture<PasscodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [ PasscodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasscodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('onCreatePasscode set submitted to true', () => {
    component.onCreatePasscode();
    expect(component.submitted).toBe(true);
  });
  it('firstPasscodeSubmit set submitted to false', () => {
    component.firstPasscodeSubmit();
    expect(component.submitted).toBe(false);
  });
  it('onFocus set current id', () => {
    component.onFocus('1');
    expect(component.currentId).toBe('1');
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
  it('onNext goto secondPasscodeSubmit if currentId is 4', () => {
    component.currentId = '4';
    component.onNext();
  });

});
