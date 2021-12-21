import { AuthService } from './../../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  successAlert: boolean;

  constructor(private authService: AuthService) {
    this.successAlert = this.authService.successAlert;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.successAlert = this.authService.successAlert;
    }, 1000);
  }

  successAlertOff() {
    this.successAlert = false;
  }

}
