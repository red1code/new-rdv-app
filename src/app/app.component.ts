import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LANGUAGES } from './models/languages';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private translateService: TranslateService) {
    translateService.setDefaultLang(LANGUAGES.ENG);
    translateService.use(localStorage.getItem('language') || LANGUAGES.ENG)
  }

}
