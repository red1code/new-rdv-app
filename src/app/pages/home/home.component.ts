import { AuthService } from './../../auth/services/auth.service';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  successAlert: boolean;
  failureAlert: boolean;
  emailError!: string;

  constructor(private authService: AuthService) {
    this.successAlert = this.authService.successAlert;
    this.failureAlert = this.authService.failureAlert;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.successAlert = this.authService.successAlert;
      this.failureAlert = this.authService.failureAlert;
      this.emailError = this.authService.emailError;
    }, 1000);
  }

  successAlertOff() {
    this.successAlert = false;
  }

  failureAlertOff() {
    this.failureAlert = false;
  }

}
