import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WriterService } from 'src/app/general-settings/services/writer.service';

import { WriterDashboardComponent } from './writer-dashboard.component';

describe('WriterDashboardComponent', () => {
  let component: WriterDashboardComponent;
  let fixture: ComponentFixture<WriterDashboardComponent>;
  let httpClient: HttpClient
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WriterService],
      declarations: [ WriterDashboardComponent ]
    })
    .compileComponents();
    httpClient = TestBed.inject(HttpClient);
    fixture = TestBed.createComponent(WriterDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('addCarEntry', () => {
    component.addCarEntry();
  });
  it('addBikeEntry', () => {
    component.addBikeEntry();
  });
  it('openDonePopup should set doneDisplayStyle to be flex', () => {
    component.openDonePopup();
    expect(component.doneDisplayStyle).toBe('flex');
  });
  it('closeDonePopup should set doneDisplayStyle to be none', () => {
    component.closeDonePopup();
    expect(component.doneDisplayStyle).toBe('none');
  });
  it('openRemovePopup should set removeDisplayStyle to be flex', () => {
    component.openRemovePopup();
    expect(component.removeDisplayStyle).toBe('flex');
  });
  it('closeRemovePopup should set removeDisplayStyle to be none', () => {
    component.closeRemovePopup();
    expect(component.removeDisplayStyle).toBe('none');
  });
  it('openErrorPopup should set somethingWentWrongStyle to be flex', () => {
    component.openErrorPopup();
    expect(component.somethingWentWrongStyle).toBe('flex');
  });
  it('closeErrorPopup should set somethingWentWrongStyle to be none', () => {
    component.closeErrorPopup();
    expect(component.somethingWentWrongStyle).toBe('none');
  });
  it('getVehicleSrc testing', () => {
    expect(component.getVehicleSrc('Bike')).toBe('../../../assets/logos/icon-bike.svg');
    expect(component.getVehicleSrc('Car')).toBe('../../../assets/logos/icon-car.svg');
  });
  it('displayAllEntries testing', () => {
    component.displayAllEntries();
  });
  it('removeEntry testing', () => {
    component.removeEntry();
  });
  
});
