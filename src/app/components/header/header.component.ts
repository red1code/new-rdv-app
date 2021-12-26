import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './../../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userIsLoggedIn!: boolean;
  user!: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private afAuth: AngularFireAuth,
    private fireStore: AngularFirestore
  ) {
    this.getAuthInfos()
  }

  ngOnInit(): void { }

  logOut() {
    this.authService.logOut().then(() => {
      this.router.navigate(['/auth/login'])
    })
  }

  getAuthInfos() {
    this.afAuth.onAuthStateChanged((usr) => {
      if (usr) {
        this.userIsLoggedIn = true;
        this.fireStore.doc<User>('/profiles/' + usr.uid).valueChanges()
          .subscribe(data => {
            this.user = data
          })
      } else {
        this.userIsLoggedIn = false;
      }
    })
  }

}
