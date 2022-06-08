import { TranslatingService } from 'src/app/services/translating.service';
import { Rendezvous, RendezvousStates } from './../../models/rendezvous';
import { Observable, merge, concat, of, map } from 'rxjs';
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
  combindRDVs$!: any //Observable<Rendezvous[]>;

  constructor(
    private authService: AuthService,
    private rdvService: RendezvousService,
    private translatingService: TranslatingService,
  ) { }

  ngOnInit(): void {
    this.approvedRDVs = this.rdvService.getRDVsByState(RendezvousStates.APPROVED, 'rdvDate');

    this.authService.getUser().subscribe(value => {
      this.user = value as User
    });

    // getting the last rdvDoc
    this.approvedRDVs.subscribe(rdvs => {
      let lastRDV = rdvs[rdvs.length - 1];
      this.rdvService
        .getDocByID(lastRDV.rdvID as string)
        .snapshotChanges()
        .subscribe(doc => this.lastDoc = doc.payload)

      console.warn('lastDoc: ', this.lastDoc);
    });
  }

  onTableNext() {
    // 1st method
    // this.combindRDVs$ = this.rdvService
    //   .getRDVsByState(RendezvousStates.APPROVED, 'rdvDate', this.lastDoc)
    //   .pipe(map(
    //     newVals => this.approvedRDVs.pipe(map(rdvs => rdvs.concat(newVals)))
    //   ));

    // 2nd method
    // this.rdvService
    //   .getRDVsByState(RendezvousStates.APPROVED, 'rdvDate', this.lastDoc)
    //   .subscribe(newVals => {
    //     this.approvedRDVs = this.approvedRDVs.pipe(map(rdvs => rdvs.concat(newVals)));
    //     this.combindRDVs$ = this.approvedRDVs;
    //   });

    // 3nd method
    let newVs = this.rdvService.getRDVsByState(RendezvousStates.APPROVED, 'rdvDate', this.lastDoc);
    let r = concat(this.approvedRDVs, newVs)
    r.subscribe(vals => {
      this.combindRDVs$ = vals
    })
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
