import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  showSidebar = false;
  usersON = true;
  RDVsON = false;

  constructor() { }

  ngOnInit(): void { }

  toggleSidebar() {
    this.showSidebar ? this.showSidebar = false : this.showSidebar = true;
  }

  showUsers() {
    this.RDVsON = false;
    this.usersON = true;
    this.toggleSidebar()
  }

  showRDVs() {
    this.usersON = false;
    this.RDVsON = true;
    this.toggleSidebar()
  }

}
