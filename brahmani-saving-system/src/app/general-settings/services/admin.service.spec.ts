import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { add_New_employee, remove_employee } from '../static/Urls';

import { AdminService } from './admin.service';

describe('AdminService', () => {
  let service: AdminService;
  let httpClient: HttpClient;
  let httpTestingController:HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[AdminService]
    });
    service = TestBed.inject(AdminService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it( 'removeEmployee testing',
  inject(
    [HttpTestingController, AdminService],
    (httpMock: HttpTestingController, dataService: AdminService) => {
      const results = [{}]
      dataService.removeEmployee('text@gmail.com')

      const mockReq = httpMock.expectOne(remove_employee);
     
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(results)
      httpMock.verify();
    }
  ));
  it( 'removeEmployee testing with error',
  inject(
    [HttpTestingController, AdminService],
    (httpMock: HttpTestingController, dataService: AdminService) => {
      const results = {status: 404, statusText: "Network error"}
      dataService.removeEmployee('text@gmail.com')

      const mockReq = httpMock.expectOne(remove_employee);
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush("Something went wrong",results)
      httpMock.verify();
    }
  ));
  it( 'addNewEmployee testing',
  inject(
    [HttpTestingController, AdminService],
    (httpMock: HttpTestingController, dataService: AdminService) => {
      const results = [{}]
      dataService.addNewEmployee('test@gmail.com','text','Employee')

      const mockReq = httpMock.expectOne(add_New_employee);
     
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(results)
      httpMock.verify();
    }
  ));
  it( 'addNewEmployee testing with error',
  inject(
    [HttpTestingController, AdminService],
    (httpMock: HttpTestingController, dataService: AdminService) => {
      const results = {status: 404, statusText: "Network error"}
      dataService.addNewEmployee('test@gmail.com','text','Employee')

      const mockReq = httpMock.expectOne(add_New_employee);
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush("Something went wrong",results)
      httpMock.verify();
    }
  ));
});
