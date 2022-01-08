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

  rdv!: Rendezvous;
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
    this.getCurrentUser();
    this.getRDVsList();
    this.rdv = this.emptyRdvVlues()
  }

  getCurrentUser() {
    this.authService.getUser().subscribe(value => {
      this.user = value as User;
    });
  }

  getRDVsList() {
    this.RDVsList = this.rdvService.getRDVs();
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

  emptyRdvVlues(): Rendezvous {
    return { displayName: '', phoneNumber: '', created_at: '', created_by: '' }
  }

}
