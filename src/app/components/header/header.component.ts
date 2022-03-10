import { AuthService } from './../../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { LANGUAGES } from 'src/app/models/languages';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  showMenu: boolean = false;
  user!: User;
  language!: string;
  langs = LANGUAGES;

  constructor(
    private router: Router,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.language = localStorage.getItem('language') || this.langs.ENG
  }

  getCurrentUser() {
    this.authService.getUser().subscribe(value => {
      this.user = value as User;
    })
  }

  get dashboardAuth() {
    return this.authService.canAccessDashboard(this.user)
  }

  logOut() {
    this.authService.logOut().then(() => {
      this.router.navigate(['/auth/login'])
    })
  }

  goToMyRDVs = () => this.router.navigate(['/rendezvous/my-rendezvous']);

  goToProfile = () => this.router.navigate(['/profile/', this.user.uid]);

  toggleMenu = () => (!this.showMenu) ? this.showMenu = true : this.showMenu = false;

  changeLanguage(event: Event) {
    const language = (event.target as HTMLTextAreaElement).value;
    localStorage.setItem('language', language);
    window.location.reload()
  }

}
