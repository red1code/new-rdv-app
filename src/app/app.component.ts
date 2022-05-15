import { SwUpdate } from '@angular/service-worker';
import { ApplicationRef, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './auth/services/auth.service';
import { LANGUAGES } from './models/languages';
import { THEMES } from './models/user';
import { TranslatingService } from './services/translating.service';
import { setTheme } from './utils/utilities';
import { first, mapTo } from 'rxjs/operators';
import { concat, fromEvent, interval, merge, Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isConnected: Observable<boolean>;
  showNotification = false;

  constructor(
    public authService: AuthService,
    private translateService: TranslateService,
    private translatingService: TranslatingService,
    private appRef: ApplicationRef,
    private swUpdate: SwUpdate,
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
    });

    // check for network connectivity
    this.isConnected = merge(
      of(navigator.onLine),
      fromEvent(window, 'online').pipe(mapTo(true)),
      fromEvent(window, 'offline').pipe(mapTo(false))
    );
    this.isConnected.subscribe(status => {
      if (!status) {
        this.showNotification = true
      }
    })
  }

  updateApp() {
    if (confirm('A new version is available. wanna install it?')) {
      this.swUpdate.activateUpdate().then(() => window.location.reload())
    }
  }

  closeNotification() {
    this.showNotification = false;
  }

}
