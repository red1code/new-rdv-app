import { AuthService } from './../../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { THEMES, User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { LANGUAGES } from 'src/app/models/languages';
import { TranslatingService } from 'src/app/services/translating.service';
import { UsersService } from 'src/app/services/users.service';
import { setTheme } from 'src/app/utils/utilities';

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
  darkMode!: boolean;

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
      this.user.language ? this.language = this.user.language : null;
      (value?.darkTheme ? this.darkMode = true : this.darkMode = false);
    })
  }

  get dashboardAuth() {
    return this.authService.canAccessDashboard(this.user)
  }

  async logOut() {
    await this.authService.logOut();
    await this.router.navigate(['/auth/login']);
    window.location.reload()
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

  async changeTheme() {
    if (!this.darkMode) {
      this.user.darkTheme = true;
      try {
        await this.usersService.updateProfile(this.user.uid as string, this.user);
        setTheme(THEMES.DARK);
        this.darkMode = true;
      }
      catch (error) {
        window.alert(error)
      }
    } else {
      this.user.darkTheme = false;
      try {
        await this.usersService.updateProfile(this.user.uid as string, this.user);
        setTheme(THEMES.LIGHT);
        this.darkMode = false;
      }
      catch (error) {
        window.alert(error)
      }
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
