import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  usersON = true;
  RDVsON = false;

  constructor() { }

  ngOnInit(): void { }

  showUsers() {
    this.RDVsON = false;
    this.usersON = true
  }

  showRDVs() {
    this.usersON = false;
    this.RDVsON = true
  }

}
