import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LANGUAGES } from '../models/languages';
import { Rendezvous } from '../models/rendezvous';
import { TablesCols } from '../models/tablesCols';

@Injectable({
  providedIn: 'root'
})
export class TranslatingService {

  constructor(private translate: TranslateService) { }

  get deviceLanguage(): LANGUAGES {
    const deviceLanguage = navigator.language;
    if (deviceLanguage === 'fr') return LANGUAGES.FR;
    if (deviceLanguage === 'ar') return LANGUAGES.AR;
    return LANGUAGES.ENG
  }

  getUsersCols(): TablesCols[] {
    return [
      { title: this.translate.instant('First Name'), data: 'firstName' },
      { title: this.translate.instant('Last Name'), data: 'lastName' },
      { title: this.translate.instant('Phone Number'), data: 'phoneNumber' },
      { title: this.translate.instant('Email'), data: 'email' },
      { title: this.translate.instant('Created At'), data: 'created_at' },
      { title: this.translate.instant('Role'), data: 'role' }
    ]
  }

  getPendingRDVsCols(): TablesCols[] {
    return [
      { title: this.translate.instant('Order'), data: 'order' },
      { title: this.translate.instant('Display Name'), data: 'displayName' },
      { title: this.translate.instant('Phone Number'), data: 'phoneNumber' },
      { title: this.translate.instant('Created At'), data: 'createdAt' },
      { title: this.translate.instant('Last Update'), data: 'lastUpdate' }
    ]
  }

  getApprovedRDVsCols(): TablesCols[] {
    return [
      { title: this.translate.instant('Order'), data: 'order' },
      { title: this.translate.instant('Display Name'), data: 'displayName' },
      { title: this.translate.instant('Phone Number'), data: 'phoneNumber' },
      { title: this.translate.instant('Created At'), data: 'createdAt' },
      { title: this.translate.instant('Last Update'), data: 'lastUpdate' },
      { title: this.translate.instant('Rendezvous Date'), data: 'rdvDate' }
    ]
  }

  getDeleteConfirmMsg(rdv: Rendezvous): string {
    return `${this.translate.instant('Are you sure You want to Delete this Rendezvous?')}
    - ${this.translate.instant('Name:')} ${rdv.displayName}
    - ${this.translate.instant('Created At:')} ${rdv.createdAt}
    `;
  }

  getCancelConfirmMsg(rdv: Rendezvous): string {
    return `${this.translate.instant('Are you sure You want to Cancel this Rendezvous?')}
    - ${this.translate.instant('Name:')} ${rdv.displayName}
    - ${this.translate.instant('Created At:')} ${rdv.createdAt}
    `;
  }

  getMonths(): string[] {
    return Array.from({ length: 12 }, (item, i) => new Date(0, i)
      .toLocaleString(this.translate.instant('en'), { month: 'short' }));
  }

  getEngMonths(): string[] {
    return Array.from({ length: 12 }, (item, i) => new Date(0, i)
      .toLocaleString('en', { month: 'short' }));
  }

  getTranslatedDate(stringDate: string): string {
    return new Date(stringDate).toLocaleString(
      this.translate.instant('en'),
      { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }
    )
  }

}
