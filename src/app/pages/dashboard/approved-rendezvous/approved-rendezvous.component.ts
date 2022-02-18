import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Rendezvous } from 'src/app/models/rendezvous';
import { TablesCols } from 'src/app/models/tablesCols';
import { User } from 'src/app/models/user';
import { RendezvousService } from 'src/app/services/rendezvous.service';
import { Months } from 'src/app/utils/utilities';
import { timeTolocalISOstring } from 'src/app/utils/utilities';

@Component({
  selector: 'app-approved-rendezvous',
  templateUrl: './approved-rendezvous.component.html',
  styleUrls: ['./approved-rendezvous.component.css']
})
export class ApprovedRendezvousComponent implements OnInit {

  user!: User;
  // table variables
  approvedRDVs!: Rendezvous[];
  approvedRDVsCols: TablesCols[] = [
    { title: 'Order', data: 'order' },
    { title: 'Display Name', data: 'displayName' },
    { title: 'Phone Number', data: 'phoneNumber' },
    { title: 'Rendezvous Date', data: 'rdvDate' }
  ];
  // popup variables
  rdv: Rendezvous | null = null;
  rdvDateForInput!: string | null;
  showPopup = false;
  errorMsg = '';
  // chart variables
  months = Months;
  approvedRDVsPerMonth!: number[];

  constructor(
    private authService: AuthService,
    private rdvService: RendezvousService
  ) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe(value => this.user = value as User);

    // this.rdvService.getApprovedRDVs().subscribe(values => {
    //   this.approvedRDVs = values;
    //   // getting chart data:
    //   const rdvsInEveryMonth = this.approvedRDVs.map(
    //     rdv => new Date(rdv.created_at).toLocaleString('en', { month: 'short' })
    //   );
    //   this.approvedRDVsPerMonth = this.months.map(
    //     month => rdvsInEveryMonth.filter(val => val == month).length
    //   )
    // })
  }

  proceedToUpdate(data: Rendezvous) {
    //   this.rdvDateForInput = timeTolocalISOstring(new Date(data.rdvDate));
    //   this.rdv = data;
    //   this.showPopup = true
  }

  async updateRDV(data: Rendezvous | null, date: string) {
    //   if (!data) {
    //     this.errorMsg = 'There is no data to update';
    //     return
    //   }
    //   if (!date) {
    //     this.errorMsg = 'Please enter a date';
    //     return
    //   }
    //   if (date === this.rdvDateForInput) {
    //     this.hidePopup();
    //     return
    //   }
    //   data.rdvDate = new Date(date);
    //   try {
    //     await this.rdvService.updateApprovedRDV(data.rdvID as string, data);
    //     this.hidePopup()
    //   }
    //   catch (error) {
    //     this.errorMsg = error as string
    // }
  }

  async deleteRDV(id: string | undefined) {
    // if (confirm(`Are you sure You want to delete "${this.rdv?.displayName}"?`)) {
    //   try {
    //     await this.rdvService.deleteApprovedRDV(id as string);
    //     this.hidePopup()
    //   } catch (error) {
    //     this.errorMsg = error as string
    //   }
    // }
  }

  hidePopup() {
    this.showPopup = false;
    this.errorMsg = '';
    this.rdv = null;
    this.rdvDateForInput = null
  }

}
