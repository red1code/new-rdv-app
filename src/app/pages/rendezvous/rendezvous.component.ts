import { Rendezvous } from './../../models/rendezvous';
import { map, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from './../../models/user';
import { AuthService } from './../../auth/services/auth.service';
import { RendezvousService } from './../../services/rendezvous.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { TablesCols } from 'src/app/models/tablesCols';

@Component({
  selector: 'app-rendezvous',
  templateUrl: './rendezvous.component.html',
  styleUrls: ['./rendezvous.component.css']
})
export class RendezvousComponent implements OnInit {

  newRDVform: FormGroup;
  user!: any;//Observable<User>;
  rdv!: Rendezvous;
  somethingWentWrong!: any;
  RDVsList!: Observable<Rendezvous[]>
  rdvCol: TablesCols[] = [
    { title: 'Order', data: 'order' },
    { title: 'Display Name', data: 'displayName' },
    { title: 'Phone Number', data: 'phoneNumber' },
    { title: 'Created At', data: 'created_at' },
    { title: 'Last Update', data: 'lastUpdate' },
  ];
  showForm: boolean = false;
  id: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private rdvService: RendezvousService,
    private authService: AuthService,
    private afAuth: AngularFireAuth,
    private fireStore: AngularFirestore
  ) {
    this.newRDVform = this.formBuilder.group({
      displayName: ['', [Validators.required, Validators.pattern(/.*\S.*/)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^(\+213|0)?[0-9]{9}$/)]],
    });
    this.getCurrentUser()
  }

  ngOnInit(): void {
    this.getRDVsList();
  }

  // this method works when a user clicks on a table row that he can edit
  proceedToUpdate(data: Rendezvous) {
    this.somethingWentWrong = '';
    this.showForm = true;
    this.newRDVform = this.formBuilder.group({
      displayName: [data.displayName, [Validators.required, Validators.pattern(/.*\S.*/)]],
      phoneNumber: [data.phoneNumber, [Validators.required, Validators.pattern(/^(\+213|0)?[0-9]{9}$/)]],
    });
    this.id = data.rdvID as string;
  }

  async submitRDVform() {
    if (this.newRDVform.invalid) return;
    this.rdv = this.newRDVform.value;
    if (this.id === '') { // id empty means it's a new RDV
      this.rdv.created_at = new Date();
      this.rdv.created_by = this.user.email
      try {
        await this.rdvService.creatNewRDV(this.rdv)
        this.newRDVform.reset();
        this.showForm = false;
      } catch (error) {
        this.somethingWentWrong = error
      }
    } else { // this the case when the id isn't empty, it means it's an update of an existing RDV
      this.rdv.lastUpdate = new Date();
      try {
        await this.rdvService.updateRDV(this.id, this.rdv);
        this.newRDVform.reset();
        this.id = '';
        this.showForm = false;
      } catch (error) {
        this.somethingWentWrong = error
      }
    }
  }

  async deleteRDV(id: string) {
    if (confirm('Are you sure You want to delete this Rendezvous?')) {
      try {
        await this.rdvService.eraseRDV(id);
        this.id = '';
        this.newRDVform.reset();
        this.showForm = false;
      } catch (error) {
        this.somethingWentWrong = error
      }

    }
  }

  getRDVsList() {
    this.RDVsList = this.rdvService.getRDVs().pipe(map(action => {
      let i = 1;
      return action.map(rdv => {
        let load = rdv.payload.doc.data();
        return {
          ...load,
          rdvID: rdv.payload.doc.id,
          created_at: load.created_at.toDate().toLocaleString(),
          lastUpdate: load.lastUpdate ? load.lastUpdate.toDate().toLocaleString() :
            'Not updated',
          order: i++
        }
      });
    }))
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
    this.newRDVform = this.formBuilder.group({
      displayName: ['', [Validators.required, Validators.pattern(/.*\S.*/)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^(\+213|0)?[0-9]{9}$/)]],
    });
    this.id = '';
  }

}
