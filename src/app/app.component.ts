import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './auth/services/auth.service';
import { LANGUAGES } from './models/languages';
import { TranslatingService } from './services/translating.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    public authService: AuthService,
    private translateService: TranslateService,
    private translatingService: TranslatingService
  ) {
    this.translateService.setDefaultLang(LANGUAGES.ENG);
    this.authService.getUser().subscribe(usr => {
      const language = usr?.language || this.translatingService.deviceLanguage;
      this.translateService.use(language);
    })
    // console.warn('nav language : ', navigator.language)
  }

}
