import { SwUpdate } from '@angular/service-worker';
import { ApplicationRef, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './auth/services/auth.service';
import { LANGUAGES } from './models/languages';
import { THEMES } from './models/user';
import { TranslatingService } from './services/translating.service';
import { setTheme } from './utils/utilities';
import { first } from 'rxjs/operators';
import { concat, interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    public authService: AuthService,
    private translateService: TranslateService,
    private translatingService: TranslatingService,
    private appRef: ApplicationRef,
    private swUpdate: SwUpdate
  ) {
    this.translateService.setDefaultLang(LANGUAGES.ENG);
    this.authService.getUser().subscribe(usr => {
      // get language
      const language = usr?.language || this.translatingService.deviceLanguage;
      this.translateService.use(language);
      // check for dark mode
      (usr?.darkTheme ? setTheme(THEMES.DARK) : setTheme(THEMES.LIGHT));
    });

    // check for app updates
    const appIsStable$ = appRef.isStable.pipe(first(isStable => isStable === true));
    const everyMin$ = interval(60 * 1000);
    const everyMinOnceAppIsStable$ = concat(appIsStable$, everyMin$);
    everyMinOnceAppIsStable$.subscribe(() => {
      swUpdate.checkForUpdate().then(evt => {
        if (evt === true) {
          this.updateApp();
        }
      })
    })
  }

  updateApp() {
    if (confirm('A new version is available. wanna install it?')) {
      this.swUpdate.activateUpdate().then(() => window.location.reload())
    }
  }

}
