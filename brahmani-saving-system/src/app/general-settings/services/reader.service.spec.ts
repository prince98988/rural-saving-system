import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { reader_dashboard_details } from '../static/Urls';

import { ReaderService } from './reader.service';

describe('ReaderService', () => {
  let service: ReaderService;
  let httpClient: HttpClient;
  let httpTestingController:HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(ReaderService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it( 'requestDashboardData testing',
  inject(
    [HttpTestingController, ReaderService],
    (httpMock: HttpTestingController, dataService: ReaderService) => {
      const results = [{}]
      dataService.requestDashboardData()
      const mockReq = httpMock.expectOne(reader_dashboard_details+'?timestamp='+new Date().toISOString());
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(results)
      httpMock.verify();
    }
  ));
  it( 'requestDashboardData testing with error',
  inject(
    [HttpTestingController, ReaderService],
    (httpMock: HttpTestingController, dataService: ReaderService) => {
      const results = {status: 404, statusText: "Network error"}
      dataService.requestDashboardData();
      const mockReq = httpMock.expectOne(reader_dashboard_details+'?timestamp='+new Date().toISOString());
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush("Something went wrong",results)
      httpMock.verify();
    }
  ));
});
