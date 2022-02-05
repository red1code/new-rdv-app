import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Rendezvous } from 'src/app/models/rendezvous';
import { TablesCols } from 'src/app/models/tablesCols';
import { User } from 'src/app/models/user';
import { RendezvousService } from 'src/app/services/rendezvous.service';
import { Months } from 'src/app/utils/utilities';

@Component({
  selector: 'app-rdvs-part',
  templateUrl: './rdvs-part.component.html',
  styleUrls: ['./rdvs-part.component.css']
})
export class RdvsPartComponent implements OnInit {

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
  // popup form variables
  showForm: boolean = false;
  rdv!: Rendezvous | null;
  formErrorMsg!: string;
  // chart variables
  months = Months;
  rdvsPerMonth!: number[];

  constructor(
    private authService: AuthService,
    private rdvService: RendezvousService
  ) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe(value => this.user = value as User); // I used subscribe coz I'm gonna need user's id later.

    this.rdvService.getRDVs().subscribe(values => {
      this.RDVsList = values;
      // getting chart data:
      const usrsInEveryMonth = this.RDVsList.map(
        rdv => new Date(rdv.created_at).toLocaleString('en', { month: 'short' }));
      this.rdvsPerMonth = this.months.map(
        month => usrsInEveryMonth.filter(val => val == month).length)
    });

    this.rdv = null;
  }

  proceedToUpdate(data: Rendezvous) {
    this.rdv = data;
    this.showForm = true;
  }

  async submitRDVform(data: any) {
    const formValues = data;
    if (!this.rdv?.rdvID) { // empty id = new RDV
      try {
        await this.rdvService.creatNewRDV(formValues, this.user)
      } catch (error) {
        this.formErrorMsg = error as string
      }
    } else if (this.rdv.rdvID) { // the id isn't empty = RDV update
      try {
        await this.rdvService.updateRDV(this.rdv.rdvID, formValues)
      } catch (error) {
        this.formErrorMsg = error as string
      }
    }
    this.hidePopupForm()
  }

  async deleteRDV(id: string) {
    if (confirm(`Are you sure you want to delete "${this.rdv?.displayName}"`)) {
      try {
        await this.rdvService.eraseRDV(id);
        this.hidePopupForm()
      } catch (error) {
        this.formErrorMsg = error as string
      }
    }
  }

  showPopupForm = () => this.showForm = true;

  hidePopupForm() {
    this.showForm = false;
    this.rdv = null;
  }

}
