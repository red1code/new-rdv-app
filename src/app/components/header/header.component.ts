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
  dashboardAuth!: boolean;
  showMenu: boolean;
  user!: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private afAuth: AngularFireAuth,
    private fireStore: AngularFirestore
  ) {
    this.getAuthInfos();
    this.showMenu = false;
  }

  ngOnInit(): void { }

  getAuthInfos() {
    this.afAuth.onAuthStateChanged((usr) => {
      if (usr) {
        this.userIsLoggedIn = true;
        this.fireStore.doc<User>('/profiles/' + usr.uid).valueChanges()
          .subscribe(data => {
            this.user = data;
            this.dashboardAuth = this.authService.canAccessDashboard(this.user)
          })
      } else {
        this.userIsLoggedIn = false;
      }
    })
  }

  toggleMenu() {
    (!this.showMenu) ? this.showMenu = true : this.showMenu = false;
  }

  goToMyRDVs = ()  => this.router.navigate(['/rendezvous/my-rendezvous']);

  goToProfile = () => this.router.navigate(['/home/profile/', this.user.uid]);

  logOut() {
    this.authService.logOut().then(() => {
      this.router.navigate(['/auth/login'])
    })
  }

}
