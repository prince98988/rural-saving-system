import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import {
  delete_vehicle_entry,
  gel_all_vehicle_entry,
  post_vehicle_entry,
} from '../static/Urls';

import { WriterService } from './writer.service';

describe('WriterService', () => {
  let service: WriterService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(WriterService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('postVehicleEntry testing', inject(
    [HttpTestingController, WriterService],
    (httpMock: HttpTestingController, dataService: WriterService) => {
      const results = [{}];
      const mockReq = httpMock.expectOne(post_vehicle_entry);
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(results);
      httpMock.verify();
    }
  ));
  it('postVehicleEntry testing with error', inject(
    [HttpTestingController, WriterService],
    (httpMock: HttpTestingController, dataService: WriterService) => {
      const results = { status: 404, statusText: 'Network error' };

      const mockReq = httpMock.expectOne(post_vehicle_entry);
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush('Something went wrong', results);
      httpMock.verify();
    }
  ));
  it('deleteCarEntry testing', inject(
    [HttpTestingController, WriterService],
    (httpMock: HttpTestingController, dataService: WriterService) => {
      const results = [{}];
      const mockReq = httpMock.expectOne(delete_vehicle_entry);
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(results);
      httpMock.verify();
    }
  ));
  it('postVehicleEntry testing with error', inject(
    [HttpTestingController, WriterService],
    (httpMock: HttpTestingController, dataService: WriterService) => {
      const results = { status: 404, statusText: 'Network error' };
      const mockReq = httpMock.expectOne(delete_vehicle_entry);
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush('Something went wrong', results);
      httpMock.verify();
    }
  ));
  it('deleteCarEntry testing', inject(
    [HttpTestingController, WriterService],
    (httpMock: HttpTestingController, dataService: WriterService) => {
      const results = [{}];
      const mockReq = httpMock.expectOne(gel_all_vehicle_entry);
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(results);
      httpMock.verify();
    }
  ));
  it('postVehicleEntry testing with error', inject(
    [HttpTestingController, WriterService],
    (httpMock: HttpTestingController, dataService: WriterService) => {
      const results = { status: 404, statusText: 'Network error' };
      const mockReq = httpMock.expectOne(gel_all_vehicle_entry);
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush('Something went wrong', results);
      httpMock.verify();
    }
  ));
  it('makeLoader and hideLoader ', () => {
    service.makeLoader();
    service.hideLoader();
  });
});
