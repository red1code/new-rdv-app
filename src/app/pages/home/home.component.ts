import { AuthService } from './../../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  emailVerified: Observable<boolean> = this.authService.isEmailVerified;

  constructor(private authService: AuthService) { }

  ngOnInit(): void { }

}
