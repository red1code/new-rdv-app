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

  dashboardAuth!: boolean;
  showMenu: boolean = false;
  user!: User;

  constructor(
    private router: Router,
    private authService: AuthService,
    public userService: UsersService
  ) {
    this.getCurrentUser();
  }

  ngOnInit(): void { }

  getCurrentUser() {
    this.authService.user.subscribe(usr => {
      this.user = usr as User;
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
