import { AuthService } from './../../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

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
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe(value => {
      this.user = value as User;
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
