import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { WriterService } from '../services/writer.service';

@Injectable()
export class WriterGuard implements CanActivate {

  constructor(private writerService: WriterService, private router:Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(this.writerService.isWriter()) return true;
    else return this.router.parseUrl('login');
  }
}