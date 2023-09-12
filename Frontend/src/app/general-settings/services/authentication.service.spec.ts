import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { login_with_email_password } from '../static/Urls';

import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpClient: HttpClient;
  let httpTestingController:HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
    });
    service = TestBed.inject(AuthenticationService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it( 'removeEmployee testing',
  inject(
    [HttpTestingController, AuthenticationService],
    (httpMock: HttpTestingController, dataService: AuthenticationService) => {
      const results = [{}]
      dataService.requestLogin('text@gmail.com','1234')

      const mockReq = httpMock.expectOne(login_with_email_password+'?Email=text@gmail.com&&password=1234');
     
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(results)
      httpMock.verify();
    }
  ));
  it( 'removeEmployee testing with error',
  inject(
    [HttpTestingController, AuthenticationService],
    (httpMock: HttpTestingController, dataService: AuthenticationService) => {
      const results = {status: 404, statusText: "Network error"}
      dataService.requestLogin('text@gmail.com','1234')

      const mockReq = httpMock.expectOne(login_with_email_password+'?Email=text@gmail.com&&password=1234');
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush("Something went wrong",results)
      httpMock.verify();
    }
  ));
  
});
