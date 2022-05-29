import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { map, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Rendezvous, RendezvousStates } from 'src/app/models/rendezvous';
import { User } from 'src/app/models/user';
import { RendezvousService } from 'src/app/services/rendezvous.service';
import { TranslatingService } from 'src/app/services/translating.service';

@Component({
  selector: 'app-my-rendezvous',
  templateUrl: './my-rendezvous.component.html',
  styleUrls: ['./my-rendezvous.component.css']
})
export class MyRendezvousComponent implements OnInit {

  user!: User;
  myApprovedRDVs!: Observable<Rendezvous[]>;
  myApprovedRDVsCols = this.translatingService.getApprovedRDVsCols();
  myPendingRDVs!: Observable<Rendezvous[]>;
  myPendingRDVsCols = this.translatingService.getPendingRDVsCols();
  halfwayPopup = false;
  updatePopup = false;
  rdv!: Rendezvous | null;
  errMsg = '';

  constructor(
    private authService: AuthService,
    private rdvService: RendezvousService,
    private translate: TranslateService,
    private translatingService: TranslatingService
  ) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe(usr => {
      this.user = usr as User;

      this.myApprovedRDVs = this.rdvService
        .getRDVsByEmailAndState(this.user.email, RendezvousStates.APPROVED, 'rdvDate')
        .pipe(map(rdvs => {
          return rdvs.map(rdv => {
            return {
              ...rdv,
              createdAt: this.translatingService.getTranslatedDate(rdv.createdAt as string),
              lastUpdate: (rdv.lastUpdate === 'Not Updated') ? this.translate.instant('Not Updated') :
                this.translatingService.getTranslatedDate(rdv.lastUpdate as string),
              rdvDate: this.translatingService.getTranslatedDate(rdv.rdvDate as string)
            }
          })
        }));

      this.myPendingRDVs = this.rdvService
        .getRDVsByEmailAndState(this.user.email, RendezvousStates.PENDING, 'createdAt')
        .pipe(map(rdvs => {
          return rdvs.map(rdv => {
            return {
              ...rdv,
              createdAt: this.translatingService.getTranslatedDate(rdv.createdAt as string),
              lastUpdate: (rdv.lastUpdate === 'Not Updated') ? this.translate.instant('Not Updated') :
                this.translatingService.getTranslatedDate(rdv.lastUpdate as string)
            }
          })
        }))
    })
  }

  showHalfwayPopup(data: Rendezvous) {
    this.rdv = data;
    this.halfwayPopup = true
  }

  proceedToUpdate() {
    this.halfwayPopup = false;
    this.updatePopup = true
  }

  get isPending() {
    return (this.rdv?.rdvState === RendezvousStates.PENDING) ? true : false
  }

  get isApproved() {
    return (this.rdv?.rdvState === RendezvousStates.APPROVED) ? true : false
  }

  async updateRendezvous(data: Rendezvous) {
    if (!this.rdv?.rdvID) return this.errMsg = 'Rendezvous not found';
    if (data.displayName === this.rdv.displayName && data.phoneNumber === this.rdv.phoneNumber)
      return this.hidePopup(); // no change was made.
    try {
      await this.rdvService.updateRendezvous(this.rdv.rdvID, data);
      return this.hidePopup()
    }
    catch (error) {
      this.errMsg = error as string
    }
  }

  async deleteRendezvous() {
    if (!this.rdv?.rdvID) return this.errMsg = 'Rendezvous ID not found';
    if (confirm(this.translatingService.getDeleteConfirmMsg(this.rdv))) {
      try {
        await this.rdvService.deleteRendezvous(this.rdv.rdvID, this.rdv, this.user);
        return this.hidePopup()
      } catch (error) {
        this.errMsg = error as string
      }
    }
  }

  async cancelRendezvous() {
    if (!this.rdv?.rdvID) return this.errMsg = 'Rendezvous ID not found';
    if (confirm(this.translatingService.getCancelConfirmMsg(this.rdv))) {
      this.rdv.rdvState = RendezvousStates.CANCELED;
      try {
        await this.rdvService.cancelRendezvous(this.rdv.rdvID, this.rdv, this.user);
        return this.hidePopup()
      } catch (error) {
        this.errMsg = error as string
      }
    }
  }

  hidePopup() {
    this.halfwayPopup = false;
    this.updatePopup = false;
    this.rdv = null;
    this.errMsg = ''
  }

}
