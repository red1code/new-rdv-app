import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { Rendezvous } from './../models/rendezvous';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class RendezvousService {


  constructor(private fireStore: AngularFirestore) { }

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
              created_at: this.convertToDateString(load.created_at),
              lastUpdate: load.lastUpdate ? this.convertToDateString(load.lastUpdate) : 'Not Updated',
              order: i++
            }
          })
        })
      )
  }

  getRDVsByEmail(usrEmail: string) {
    return this.fireStore
      .collection<Rendezvous>('Rendezvous', ref => ref.where('created_by', '==', usrEmail))
      .snapshotChanges().pipe(map(values => {
        let i = 1;
        return values.map(rdv => {
          const load = rdv.payload.doc.data();
          return {
            ...load,
            rdvID: rdv.payload.doc.id,
            created_at: this.convertToDateString(load.created_at),
            lastUpdate: load.lastUpdate ? this.convertToDateString(load.lastUpdate) : 'Not Updated',
            order: i++
          }
        })
      }))
  }

  private convertToDateString(param: any): string {
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
