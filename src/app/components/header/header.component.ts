import { Observable } from 'rxjs';
import { AuthService } from './../../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userIsLoggedIn!: Observable<boolean>;
  dashboardAuth!: boolean;
  showMenu: boolean;
  user!: User;

  constructor(
    private router: Router,
    public userService: UsersService,
    private authService: AuthService
  ) {
    this.showMenu = false;
    this.getCurrentUser();
    this.userIsLoggedIn = this.authService.loggedIn$;

  }

  ngOnInit(): void { }

  getCurrentUser() {
    this.userService.user.subscribe(result => {
      this.user = result as User;
      this.dashboardAuth = this.authService.canAccessDashboard(this.user)
    })
  }

  logOut() {
    this.authService.logOut().then(() => {
      this.router.navigate(['/auth/login'])
    })
  }

  goToMyRDVs = () => this.router.navigate(['/rendezvous/my-rendezvous']);

  goToProfile = () => this.router.navigate(['/home/profile/', this.user.uid]);

  toggleMenu = () => (!this.showMenu) ? this.showMenu = true : this.showMenu = false;

}



// THE END.
