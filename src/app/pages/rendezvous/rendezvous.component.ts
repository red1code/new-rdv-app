import { Rendezvous } from './../../models/rendezvous';
import { Observable } from 'rxjs';
import { User } from './../../models/user';
import { RendezvousService } from './../../services/rendezvous.service';
import { Component, OnInit } from '@angular/core';
import { TablesCols } from 'src/app/models/tablesCols';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-rendezvous',
  templateUrl: './rendezvous.component.html',
  styleUrls: ['./rendezvous.component.css']
})
export class RendezvousComponent implements OnInit {

  rdv!: Rendezvous | null;
  formErrorMsg!: string;
  showForm: boolean = false;
  user!: User;

  pendingRDVs!: Observable<Rendezvous[]>;
  approvedRDVs!: Observable<Rendezvous[]>;
  finishedRDVs!: Observable<Rendezvous[]>;
  canceledRDVs!: Observable<Rendezvous[]>;
  deletedRDVs!: Observable<Rendezvous[]>;

  rdvCol: TablesCols[] = [
    { title: 'Order', data: 'order' },
    { title: 'Display Name', data: 'displayName' },
    { title: 'Phone Number', data: 'phoneNumber' },
    { title: 'Created At', data: 'created_at' },
    { title: 'Last Update', data: 'lastUpdate' },
  ];

  constructor(
    private authService: AuthService,
    private rdvService: RendezvousService
  ) { }

  ngOnInit(): void {
    this.rdv = null;

    this.pendingRDVs = this.rdvService.getPendingRendezvous();
    this.approvedRDVs = this.rdvService.getApprovedRendezvous();
    this.finishedRDVs = this.rdvService.getPendingRendezvous();
    this.canceledRDVs = this.rdvService.getPendingRendezvous();
    this.deletedRDVs = this.rdvService.getPendingRendezvous();

    this.authService.getUser().subscribe(value => {
      this.user = value as User
    })
  }

  proceedToUpdate(data: Rendezvous) {
    this.rdv = data;
    this.showForm = true;
  }

  showPopupForm() {
    this.showForm = true;
  }

  hidePopupForm() {
    this.showForm = false;
    this.rdv = null;
  }

  async submitRDVform(data: any) {
    const formValues = data;
    if (!this.rdv?.rdvID) { // id empty means it's a new RDV
      try {
        await this.rdvService.createRendezvous(formValues, this.user)
      }
      catch (error) {
        this.formErrorMsg = error as string
      }
    }
    else if (this.rdv.rdvID) { // here the id isn't empty, so it's an update of an existing RDV
      // try {
      //   await this.rdvService.updateRDV(this.rdv.rdvID, formValues);
      // }
      // catch (error) {
      //   this.formErrorMsg = error as string
      // }
    }
    this.hidePopupForm()
  }

  async deleteRDV(id: string) {
    // if (confirm('Are you sure You want to delete this Rendezvous?')) {
    //   try {
    //     await this.rdvService.eraseRDV(id);
    //     this.hidePopupForm();
    //   } catch (error) {
    //     this.formErrorMsg = error as string
    //   }
    // }
  }

}
