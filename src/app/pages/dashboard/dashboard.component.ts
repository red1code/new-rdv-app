import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  usersON = true;
  RDVsON = false;
  approvedRDVsON = false;

  constructor() { }

  ngOnInit(): void { }

  showUsers() {
    this.approvedRDVsON = false;
    this.RDVsON = false;
    this.usersON = true
  }

  showRDVs() {
    this.approvedRDVsON = false;
    this.usersON = false;
    this.RDVsON = true
  }

  showApprovedRDVs() {
    this.RDVsON = false;
    this.usersON = false;
    this.approvedRDVsON = true
  }

}
