import { Rendezvous } from './../../models/rendezvous';
import { Observable } from 'rxjs';
import { User } from './../../models/user';
import { RendezvousService } from './../../services/rendezvous.service';
import { Component, OnInit } from '@angular/core';
import { TablesCols } from 'src/app/models/tablesCols';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-rendezvous',
  templateUrl: './rendezvous.component.html',
  styleUrls: ['./rendezvous.component.css']
})
export class RendezvousComponent implements OnInit {

  rdv!: Rendezvous;
  formErrorMsg!: string;
  showForm: boolean = false;
  user!: User;
  RDVsList!: Observable<Rendezvous[]>;
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
    this.RDVsList = this.rdvService.getRDVs()
    this.getCurrentUser();
    this.rdv = this.emptyRdvVlues()
  }

  getCurrentUser() {
    this.authService.getUser().subscribe(value => {
      this.user = value as User
    });
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
    this.rdv = this.emptyRdvVlues();
  }

  async submitRDVform(data: FormGroup) {
    const formValues = data as any;
    if (!this.rdv.rdvID) { // id empty means it's a new RDV
      formValues.created_at = new Date();
      formValues.created_by = this.user.email;
      try {
        await this.rdvService.creatNewRDV(formValues)
        this.hidePopupForm();
      }
      catch (error) {
        this.formErrorMsg = error as string
      }
    }
    else if (this.rdv.rdvID) { // here the id isn't empty, so it's an update of an existing RDV
      formValues.lastUpdate = new Date();
      try {
        await this.rdvService.updateRDV(this.rdv.rdvID, formValues);
        this.hidePopupForm();
      }
      catch (error) {
        this.formErrorMsg = error as string
      }
    }
  }

  async deleteRDV(id: string) {
    if (confirm('Are you sure You want to delete this Rendezvous?')) {
      try {
        await this.rdvService.eraseRDV(id);
        this.hidePopupForm();
      } catch (error) {
        this.formErrorMsg = error as string
      }
    }
  }

  emptyRdvVlues(): Rendezvous {
    return { displayName: '', phoneNumber: '', created_at: '', created_by: '' }
  }

}
