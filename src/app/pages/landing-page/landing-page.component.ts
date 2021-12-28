import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth
  ) {
    this.checkAuth()
  }

  ngOnInit(): void { }

  checkAuth() {
    this.afAuth.onAuthStateChanged(user => user ? this.router.navigate(['/home']) : null)
  }

}
