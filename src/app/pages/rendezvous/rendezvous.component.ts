import { TranslatingService } from 'src/app/services/translating.service';
import { Rendezvous, RendezvousStates } from './../../models/rendezvous';
import { Observable } from 'rxjs';
import { User } from './../../models/user';
import { RendezvousService } from './../../services/rendezvous.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DocumentSnapshot } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-rendezvous',
  templateUrl: './rendezvous.component.html',
  styleUrls: ['./rendezvous.component.css']
})
export class RendezvousComponent implements OnInit {

  user!: User;
  approvedRDVs!: Observable<Rendezvous[]>;
  rdvCol = this.translatingService.getApprovedRDVsCols();
  showForm = false;
  formErrorMsg = '';
  rdv: Rendezvous | null = null;

  lastDoc!: DocumentSnapshot<Rendezvous>;
  firstDoc!: DocumentSnapshot<Rendezvous>;

  constructor(
    private authService: AuthService,
    private rdvService: RendezvousService,
    private translatingService: TranslatingService,
  ) { }

  ngOnInit(): void {
    this.approvedRDVs = this.rdvService.getRDVsByState(RendezvousStates.APPROVED, 'rdvDate', 'BEGINNING');

    this.authService.getUser().subscribe(value => {
      this.user = value as User
    });

    // getting the last doc
    this.setLastDoc();
  }

  onNextBtn() {
    this.rdvService.getDocByID(this.lastDoc.id).get()
      .subscribe(
        ds => {
          this.approvedRDVs = this.rdvService.getRDVsByState(RendezvousStates.APPROVED, 'rdvDate', 'NEXT', ds);
          this.setLastDoc();
          this.setFirstDoc();
        }
      )
  }

  onPreviousBtn() {
    this.rdvService.getDocByID(this.firstDoc.id).get()
      .subscribe(
        ds => {
          this.approvedRDVs = this.rdvService.getRDVsByState(RendezvousStates.APPROVED, 'rdvDate', 'PREVIOUS', ds);
          this.setLastDoc();
          this.setFirstDoc();
        }
      )
  }

  private setLastDoc() {
    this.approvedRDVs.subscribe(rdvs => {
      let lastRDV = rdvs[rdvs.length - 1];
      this.rdvService.getDocByID(lastRDV.rdvID as string)
        .snapshotChanges()
        .subscribe(doc => this.lastDoc = doc.payload)
    });
  }

  private setFirstDoc() {
    this.approvedRDVs.subscribe(rdvs => {
      let firstRDV = rdvs[0];
      this.rdvService.getDocByID(firstRDV.rdvID as string)
        .snapshotChanges()
        .subscribe(doc => this.firstDoc = doc.payload)
    });
  }

  proceedToUpdate(data: Rendezvous) {
    this.rdv = data;
    this.showForm = true
  }

  showPopup() {
    this.showForm = true
  }

  hidePopup() {
    this.showForm = false;
    this.formErrorMsg = '';
    this.rdv = null
  }

  async submitRDVform(data: Rendezvous) {
    // no ID = new RDV
    if (!this.rdv?.rdvID) {
      try {
        await this.rdvService.createRendezvous(data, this.user)
      }
      catch (error) {
        this.formErrorMsg = error as string
      }
    }
    // ID exist = update RDV
    if (this.rdv?.rdvID) {
      try {
        await this.rdvService.updateRendezvous(this.rdv.rdvID, data)
      }
      catch (error) {
        this.formErrorMsg = error as string
      }
    }
    this.hidePopup()
  }

}
