import { AuthService } from 'src/app/auth/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  usersON = true;
  RDVsON = false;

  constructor(private authService: AuthService) { }

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
