import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AdminService } from '../services/admin.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private adminService: AdminService, private router:Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(this.adminService.isAdmin()) return true;
    else return this.router.parseUrl('login');
  }
}