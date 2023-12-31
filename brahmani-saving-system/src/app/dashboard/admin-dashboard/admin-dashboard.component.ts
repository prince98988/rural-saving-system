import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    //this.makeLoader()
  }
  goToReader() {
    this.router.navigate(['dashboard-reader']);
  }
  goToWriter() {
    this.router.navigate(['dashboard-writer']);
  }
  goToAnalytics(): void {
    this.router.navigate(['analytics']);
  }
  showEmployeeList(): void {
    this.router.navigate(['manage-members']);
  }

  gotoConfiguration(): void {
    this.router.navigate(['association-info']);
  }

  gotoUpdateTables(): void {
    this.router.navigate(['update-tables']);
  }
}
