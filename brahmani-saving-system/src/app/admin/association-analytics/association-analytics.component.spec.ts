import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationAnalyticsComponent } from './association-analytics.component';

describe('AssociationAnalyticsComponent', () => {
  let component: AssociationAnalyticsComponent;
  let fixture: ComponentFixture<AssociationAnalyticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssociationAnalyticsComponent]
    });
    fixture = TestBed.createComponent(AssociationAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
