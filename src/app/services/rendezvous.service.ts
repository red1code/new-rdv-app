import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { AuthService } from '../auth/services/auth.service';
import { Rendezvous } from './../models/rendezvous';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class RendezvousService {

  usrEmail!: string | undefined;

  constructor(
    private authService: AuthService,
    private fireStore: AngularFirestore
  ) {
    this.authService.getUser().subscribe(usr => this.usrEmail = usr?.email)
  }

  creatNewRDV(rdv: Rendezvous, currentUser: User): Promise<DocumentReference<Rendezvous>> {
    rdv.created_at = new Date();
    rdv.created_by = currentUser.email;
    return this.fireStore.collection<Rendezvous>('Rendezvous').add(rdv)
  }

  updateRDV(id: string, rdv: Rendezvous): Promise<void> {
    rdv.lastUpdate = new Date();
    return this.fireStore.collection<Rendezvous>('Rendezvous').doc(id).update(rdv)
  }

  eraseRDV(id: string): Promise<void> {
    return this.fireStore.collection<Rendezvous>("Rendezvous").doc(id).delete();
  }

  getRDVs(): Observable<Rendezvous[]> {
    return this.fireStore
      .collection<Rendezvous>('Rendezvous', ref => ref.orderBy('created_at'))
      .snapshotChanges()
      .pipe(
        map(action => {
          let i = 1;
          return action.map(rdv => {
            let load = rdv.payload.doc.data();
            return {
              ...load,
              rdvID: rdv.payload.doc.id,
              created_at: this.convertToDate(load.created_at),
              lastUpdate: load.lastUpdate ? this.convertToDate(load.lastUpdate) : 'Not updated',
              order: i++
            }
          })
        })
      )
  }

  getMyRDVs() {
    return this.getRDVs().pipe(map(action => action.filter(rdv => rdv.created_by === this.usrEmail)));
  }

  private convertToDate(param: any) {
    return param.toDate().toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  }

}
