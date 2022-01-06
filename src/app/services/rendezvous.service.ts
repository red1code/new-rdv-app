import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { Rendezvous } from './../models/rendezvous';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RendezvousService {

  constructor(private fireStore: AngularFirestore) { }

  creatNewRDV(rdv: Rendezvous): Promise<DocumentReference<Rendezvous>> {
    return this.fireStore.collection<Rendezvous>('Rendezvous').add(rdv)
  }

  updateRDV(id: string, rdv: Rendezvous): Promise<void> {
    return this.fireStore.collection<Rendezvous>('Rendezvous').doc(id).update(rdv)
  }

  eraseRDV(id: string): Promise<void> {
    return this.fireStore.collection<Rendezvous>("Rendezvous").doc(id).delete();
  }

  getRDVs(): Observable<Rendezvous[]> {
    return  this.fireStore
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
            created_at: load.created_at.toDate().toLocaleString(),
            lastUpdate: load.lastUpdate ? load.lastUpdate.toDate().toLocaleString() :
            'Not updated',
            order: i++
          }
        })
      }));
    }

  }
