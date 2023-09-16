import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ReaderService } from '../services/reader.service';

@Injectable()
export class ReaderGuard implements CanActivate {

  constructor(private readerService: ReaderService, private router:Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(this.readerService.isReader()) return true;
    else return this.router.parseUrl('login');
  }
}