import { AngularFirestore, DocumentSnapshot } from '@angular/fire/compat/firestore';
import { TranslatingService } from 'src/app/services/translating.service';
import { Rendezvous, RendezvousStates } from './../../models/rendezvous';
import { map, Observable } from 'rxjs';
import { User } from './../../models/user';
import { RendezvousService } from './../../services/rendezvous.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { TranslateService } from '@ngx-translate/core';

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

  lastDoc!: Rendezvous;

  constructor(
    private authService: AuthService,
    private rdvService: RendezvousService,
    private translate: TranslateService,
    private translatingService: TranslatingService,
    private afs: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.approvedRDVs = this.rdvService
      .getRDVsByState(RendezvousStates.APPROVED, 'rdvDate')

    this.authService.getUser().subscribe(value => {
      this.user = value as User
    });

    // to get the last rdv
    this.setlastdoc();
  }

  private setlastdoc() {
    this.approvedRDVs.subscribe(rdvs => {
      this.lastDoc = rdvs[rdvs.length - 1];

      console.warn('lastDoc: ', this.lastDoc);
    });
  }

  onTableNext() {
    this.afs.collection<Rendezvous>('Rendezvous').doc(this.lastDoc.rdvID).get()
    .subscribe(
      ds => {
        this.approvedRDVs = this.rdvService.getRDVsByState(RendezvousStates.APPROVED, 'rdvDate', ds);
        this.setlastdoc()
      }
    )

    // this.rdvService
    //   .getDocByID(this.lastDoc.rdvID as string)
    //   .snapshotChanges()
    //   .subscribe(doc => {
    //     this.approvedRDVs = this.rdvService
    //     .getRDVsByState(RendezvousStates.APPROVED, 'rdvDate', doc.payload)
    //       .pipe(map(rdvs => {
    //         return rdvs.map(rdv => {
    //           return {
    //             ...rdv,
    //             createdAt: rdv.createdAt,
    //             lastUpdate: (rdv.lastUpdate === 'Not Updated') ? this.translate.instant('Not Updated') :
    //               rdv.lastUpdate,
    //             rdvDate: rdv.rdvDate as string
    //           }
    //         })
    //       }));
    //   })
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
