import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaderDashboardComponent } from './reader-dashboard.component';

describe('ReaderDashboardComponent', () => {
  let component: ReaderDashboardComponent;
  let fixture: ComponentFixture<ReaderDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      declarations: [ ReaderDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReaderDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
