import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberAnalyticsComponent } from './member-analytics.component';

describe('MemberAnalyticsComponent', () => {
  let component: MemberAnalyticsComponent;
  let fixture: ComponentFixture<MemberAnalyticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemberAnalyticsComponent]
    });
    fixture = TestBed.createComponent(MemberAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
