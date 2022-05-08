import { AuthService } from './../../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { LANGUAGES } from 'src/app/models/languages';
import { TranslatingService } from 'src/app/services/translating.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  showMenu: boolean = false;
  user!: User;
  language = this.translatingService.deviceLanguage;
  langs = LANGUAGES;
  showMobileLinks = false;

  constructor(
    private router: Router,
    public authService: AuthService,
    private usersService: UsersService,
    private translatingService: TranslatingService
  ) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService.getUser().subscribe(value => {
      this.user = value as User;
      this.user.language ? this.language = this.user.language : null
    })
  }

  get dashboardAuth() {
    return this.authService.canAccessDashboard(this.user)
  }

  logOut() {
    this.authService.logOut().then(() => {
      this.router.navigate(['/auth/login']);
      this.language = this.translatingService.deviceLanguage
    })
  }

  goToMyRDVs = () => this.router.navigate(['/rendezvous/my-rendezvous']);

  goToProfile = () => this.router.navigate(['/profile/', this.user.uid]);

  toggleMenu = () => (!this.showMenu) ? this.showMenu = true : this.showMenu = false;

  toggleMobileNav = () => (!this.showMobileLinks ? this.showMobileLinks = true : this.showMobileLinks = false);

  async changeLanguage(event: Event) {
    const language = (event.target as HTMLTextAreaElement).value as LANGUAGES;
    this.user.language = language;
    try {
      await this.usersService.updateProfile(this.user.uid as string, this.user)
    }
    catch (error) {
      window.alert(error)
    }
    window.location.reload()
  }

  hideMenu(event: any) {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      this.showMobileLinks = false
    }
  }

}






/*

hideMenu(event: any) {
  if (!event.currentTarget.contains(event.relatedTarget)) {
    this.showMobileLinks = false
  }
}

*/
