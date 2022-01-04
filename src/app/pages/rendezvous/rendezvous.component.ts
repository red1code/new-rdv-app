import { Rendezvous } from './../../models/rendezvous';
import { Observable } from 'rxjs';
import { User } from './../../models/user';
import { RendezvousService } from './../../services/rendezvous.service';
import { Component, OnInit } from '@angular/core';
import { TablesCols } from 'src/app/models/tablesCols';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-rendezvous',
  templateUrl: './rendezvous.component.html',
  styleUrls: ['./rendezvous.component.css']
})
export class RendezvousComponent implements OnInit {

  user!: User;
  rdv!: Rendezvous;
  id: string;
  showForm: boolean = false;
  RDVsList!: Observable<Rendezvous[]>;
  rdvCol: TablesCols[] = [
    { title: 'Order', data: 'order' },
    { title: 'Display Name', data: 'displayName' },
    { title: 'Phone Number', data: 'phoneNumber' },
    { title: 'Created At', data: 'created_at' },
    { title: 'Last Update', data: 'lastUpdate' },
  ];

  constructor(
    private userService: UsersService,
    private rdvService: RendezvousService
  ) {
    this.id = '';
    this.getCurrentUser();
  }

  ngOnInit(): void {
    this.getRDVsList();
  }

  getRDVsList() {
    this.RDVsList = this.rdvService.getRDVs();
  }

  getCurrentUser() {
    this.userService.user.subscribe(result => {
      this.user = result as User;
    });
  }

  proceedToUpdate(data: Rendezvous) {
    this.rdv = data;
    this.id = data.rdvID as string;
    this.showForm = true;
  }

  showPopupForm() {
    this.showForm = true;
  }

  hidePopupForm() {
    this.showForm = false;
    this.rdv = this.emptyRDVvlues();
    this.id = '';
  }

  changeFormStatus(value: boolean) {
    this.showForm = value;
    this.rdv = this.emptyRDVvlues();
    this.id = '';
  }

  emptyRDVvlues(): Rendezvous {
    return { displayName: '', phoneNumber: '', created_at: '', created_by: '' }
  }

}
