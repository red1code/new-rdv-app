import { AngularFirestore, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { Rendezvous } from './../models/rendezvous';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RendezvousService {

  constructor(private fireStore: AngularFirestore) { }

  creatNewRDV(rdv: Rendezvous) {
    return this.fireStore.collection('Rendezvous').add(rdv)
  }

  updateRDV(id: string, rdv: Rendezvous): Promise<void> {
    return this.fireStore.collection<Rendezvous>('Rendezvous').doc(id).update(rdv)
  }

  eraseRDV(id: string): Promise<void> {
    return this.fireStore.collection<Rendezvous>("Rendezvous").doc(id).delete();
  }


  // : Observable<DocumentChangeAction<Rendezvous[]>[]>
  getRDVs() {
    return this.fireStore.collection<Rendezvous>('Rendezvous', ref => ref.orderBy('created_at'))
      .snapshotChanges()
  }

}
