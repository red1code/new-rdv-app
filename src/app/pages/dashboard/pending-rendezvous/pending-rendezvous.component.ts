import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Rendezvous } from 'src/app/models/rendezvous';
import { TablesCols } from 'src/app/models/tablesCols';
import { User } from 'src/app/models/user';
import { RendezvousService } from 'src/app/services/rendezvous.service';
import { Months } from 'src/app/utils/utilities';

@Component({
  selector: 'app-pending-rendezvous',
  templateUrl: './pending-rendezvous.component.html',
  styleUrls: ['./pending-rendezvous.component.css']
})
export class PendingRendezvousComponent implements OnInit {

  user!: User;
  // table variables
  RDVsList!: Rendezvous[];
  rdvCol: TablesCols[] = [
    { title: 'Order', data: 'order' },
    { title: 'Display Name', data: 'displayName' },
    { title: 'Phone Number', data: 'phoneNumber' },
    { title: 'Created At', data: 'created_at' },
    { title: 'Last Update', data: 'lastUpdate' }
  ];
  // popup variables
  rdv: Rendezvous | null = null;
  showApproveRDVpopup = false;
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

    // this.rdvService.getRDVs().subscribe(values => {
    //   this.RDVsList = values;
    //   // getting chart data:
    //   const rdvsInEveryMonth = this.RDVsList.map(
    //     rdv => new Date(rdv.created_at).toLocaleString('en', { month: 'short' })
    //   );
    //   this.rdvsPerMonth = this.months.map(
    //     month => rdvsInEveryMonth.filter(val => val == month).length
    //   )
    // })
  }

  proceedToApproveRDV(data: Rendezvous) {
    this.rdv = data;
    this.showApproveRDVpopup = true;
  }

  async approveRDV(data: Rendezvous | null, date: string) {
    // if (!date) {
    //   this.errorMsg = 'Please enter a date';
    //   return
    // }
    // try {
    //   await this.rdvService.addApprovedRDV(data as Rendezvous, date, this.user);
    //   this.hidePopup()
    // }
    // catch (error) {
    //   this.errorMsg = error as string
    // }
  }

  async deleteRDV(id: string | undefined) {
    // if (confirm(`Are you sure You want to delete "${this.rdv?.displayName}"?`)) {
    //   try {
    //     await this.rdvService.eraseRDV(id as string);
    //     this.hidePopup()
    //   } catch (error) {
    //     this.errorMsg = error as string
    //   }
    // }
  }

  hidePopup() {
    this.showApproveRDVpopup = false;
    this.errorMsg = '';
    this.rdv = null;
  }

}
