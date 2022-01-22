import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user!: Observable<User>;
  usersON = true;
  RDVsON = false;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getUser() as Observable<User>;
  }

  showUsers() {
    this.RDVsON = false;
    this.usersON = true
  }

  showRDVs() {
    this.usersON = false;
    this.RDVsON = true
  }

}
