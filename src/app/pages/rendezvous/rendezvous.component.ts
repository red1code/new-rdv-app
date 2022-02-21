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

  user!: User;
  approvedRDVs!: Observable<Rendezvous[]>;
  rdvCol: TablesCols[] = [
    { title: 'Order', data: 'order' },
    { title: 'Display Name', data: 'displayName' },
    { title: 'Phone Number', data: 'phoneNumber' },
    { title: 'Created At', data: 'createdAt' },
    { title: 'Last Update', data: 'lastUpdate' },
    { title: 'Rendezvous Date', data: 'rdvDate' }
  ];
  showForm = false;
  formErrorMsg = '';
  rdv: Rendezvous | null = null;

  constructor(
    private authService: AuthService,
    private rdvService: RendezvousService
  ) { }

  ngOnInit(): void {
    this.approvedRDVs = this.rdvService.getApprovedRendezvous();

    this.authService.getUser().subscribe(value => {
      this.user = value as User
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
