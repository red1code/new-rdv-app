import { AuthService } from './../../auth/services/auth.service';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  alert: boolean;

  constructor(private authService: AuthService) {
    this.alert = this.authService.successAlert
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.alert = this.authService.successAlert
    }, 1000)
  }

  off() {
    this.alert = false;
  }

}
