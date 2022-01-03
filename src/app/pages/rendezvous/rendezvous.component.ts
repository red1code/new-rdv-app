import { Rendezvous } from './../../models/rendezvous';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from './../../models/user';
import { RendezvousService } from './../../services/rendezvous.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { TablesCols } from 'src/app/models/tablesCols';

@Component({
  selector: 'app-rendezvous',
  templateUrl: './rendezvous.component.html',
  styleUrls: ['./rendezvous.component.css']
})
export class RendezvousComponent implements OnInit {

  user!: any;//Observable<User>;
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
    private afAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private rdvService: RendezvousService
  ) {
    this.id = '';
    this.getCurrentUser();
  }

  ngOnInit(): void {
    this.getRDVsList();
  }

  proceedToUpdate(data: Rendezvous) {
    this.rdv = data;
    this.id = data.rdvID as string;
    this.showForm = true;
  }

  getRDVsList() {
    this.RDVsList = this.rdvService.getRDVs();
  }

  getCurrentUser() {
    this.afAuth.onAuthStateChanged((usr) => {
      if (usr) {
        this.fireStore.doc<User>('/profiles/' + usr.uid).valueChanges()
          .subscribe(data => {
            this.user = data;
          })
      }
    })
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
