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
  // : Observable<DocumentChangeAction<Rendezvous[]>[]>
  getRDVs() {
    return this.fireStore.collection<Rendezvous>('Rendezvous', ref => ref.orderBy('created_at'))
      .snapshotChanges()
  }

}
