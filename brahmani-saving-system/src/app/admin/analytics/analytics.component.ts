import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
})
export class AnalyticsComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit(): void {}

  goToAssociationAnalytics() {
    this.router.navigate(['association-analytics']);
  }
  goToMemberAnalytics() {
    this.router.navigate(['member-analytics']);
  }
}
