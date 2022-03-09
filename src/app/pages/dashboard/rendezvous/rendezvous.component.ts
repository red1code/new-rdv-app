import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Rendezvous, RendezvousStates } from 'src/app/models/rendezvous';
import { TablesCols } from 'src/app/models/tablesCols';
import { User } from 'src/app/models/user';
import { RendezvousService } from 'src/app/services/rendezvous.service';
import { Months } from 'src/app/utils/utilities';

@Component({
  selector: 'app-rendezvous',
  templateUrl: './rendezvous.component.html',
  styleUrls: ['./rendezvous.component.css']
})
export class RendezvousComponent implements OnInit {

  user!: User;
  // table variables
  pendingRendezvous!: Observable<Rendezvous[]>;
  pendingRDVsCols: TablesCols[] = [
    { title: 'Order', data: 'order' },
    { title: 'Display Name', data: 'displayName' },
    { title: 'Phone Number', data: 'phoneNumber' },
    { title: 'Created At', data: 'createdAt' },
    { title: 'Last Update', data: 'lastUpdate' }
  ];
  approvedRendezvous!: Observable<Rendezvous[]>;
  approvedRDVsCols: TablesCols[] = [
    { title: 'Order', data: 'order' },
    { title: 'Display Name', data: 'displayName' },
    { title: 'Phone Number', data: 'phoneNumber' },
    { title: 'Created At', data: 'createdAt' },
    { title: 'Last Update', data: 'lastUpdate' },
    { title: 'Rendezvous Date', data: 'rdvDate' }
  ];
  // popup variables
  halfwayPopup = false;
  updateRDVpopup = false;
  approveRDVpopup = false;
  rdv: Rendezvous | null = null;
  errorMsg = '';
  // chart variables
  months = Months;
  rdvsPerMonth!: number[];

  constructor(
    private authService: AuthService,
    private rdvService: RendezvousService
  ) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe(value => this.user = value as User);
    // tables data
    this.approvedRendezvous = this.rdvService.getApprovedRendezvous();
    this.pendingRendezvous = this.rdvService.getPendingRendezvous();
    // chart data
    this.rdvService.getAllRendezvous().subscribe(values => {
      const rdvsInEveryMonth = values.map(
        rdv => new Date(rdv.createdAt).toLocaleString('en', { month: 'short' })
      );
      this.rdvsPerMonth = this.months.map(
        month => rdvsInEveryMonth.filter(val => val == month).length
      )
    })
  }

  get isPending() {
    return (this.rdv?.rdvState === RendezvousStates.PENDING) ? true : false
  }

  get isApproved() {
    return (this.rdv?.rdvState === RendezvousStates.APPROVED) ? true : false
  }

  showHalfwayPopup(data: Rendezvous) {
    this.rdv = data;
    this.halfwayPopup = true
  }

  proceedToApproveRDV() {
    this.halfwayPopup = false;
    this.updateRDVpopup = false;
    this.approveRDVpopup = true;
  }

  proceedToUpdateRDV() {
    this.halfwayPopup = false;
    this.approveRDVpopup = false;
    this.updateRDVpopup = true;
  }

  hidePopup() {
    this.approveRDVpopup = false;
    this.updateRDVpopup = false;
    this.halfwayPopup = false;
    this.errorMsg = '';
    this.rdv = null;
  }

  async approveRDV(data: Rendezvous | null, rdvDate: string) {
    if (!rdvDate) return this.errorMsg = 'Please enter a date';
    if (!data) return this.errorMsg = 'Rendezvous not found';
    data.rdvDate = new Date(rdvDate);
    try {
      await this.rdvService.approveRendezvous(data.rdvID as string, data, this.user);
      return this.hidePopup()
    }
    catch (error) {
      this.errorMsg = error as string
    }
  }

  async updateRendezvous(data: Rendezvous) {
    if (!this.rdv?.rdvID) return this.errorMsg = 'Rendezvous not found';
    if (data.displayName === this.rdv.displayName && data.phoneNumber === this.rdv.phoneNumber) return this.hidePopup(); // no change was made.
    try {
      await this.rdvService.updateRendezvous(this.rdv.rdvID, data);
      return this.hidePopup()
    }
    catch (error) {
      this.errorMsg = error as string
    }
  }

  async deleteRendezvous() {
    if (!this.rdv?.rdvID) return this.errorMsg = 'Rendezvous ID not found';
    if (confirm(`Are you sure You want to delete this Rendezvous? \n
      - Name: ${this.rdv?.displayName} \n
      - Created At: ${this.rdv?.createdAt}`
    )) {
      try {
        await this.rdvService.deleteRendezvous(this.rdv.rdvID, this.rdv, this.user);
        return this.hidePopup()
      } catch (error) {
        this.errorMsg = error as string
      }
    }
  }

  async cancelRendezvous() {
    if (!this.rdv?.rdvID) return this.errorMsg = 'Rendezvous ID not found';
    if (confirm(`Are you sure You want to Call Off this Rendezvous? \n
      - Name: ${this.rdv?.displayName} \n
      - Created At: ${this.rdv?.createdAt}`
    )) {
      try {
        await this.rdvService.cancelRendezvous(this.rdv.rdvID, this.rdv, this.user);
        return this.hidePopup()
      } catch (error) {
        this.errorMsg = error as string
      }
    }
  }

}
