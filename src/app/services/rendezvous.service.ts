import { AngularFirestore, AngularFirestoreDocument, DocumentReference } from '@angular/fire/compat/firestore';
// import { getDoc } from '@angular/fire/compat/firestore/'
import { getDoc } from 'firebase/firestore/lite';
import { Rendezvous, RendezvousStates } from './../models/rendezvous';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../models/user';
import { TranslatingService } from './translating.service';

@Injectable({
  providedIn: 'root'
})
export class RendezvousService {

  constructor(
    private fireStore: AngularFirestore,
    private translatingService: TranslatingService
  ) { }

  // =============== CREATE ===============

  async createRendezvous(rdv: Rendezvous, currentUser: User): Promise<DocumentReference<Rendezvous>> {
    rdv.createdAt = new Date();
    rdv.createdBy = currentUser.email;
    rdv.rdvState = RendezvousStates.PENDING;
    return await this.fireStore.collection<Rendezvous>('Rendezvous').add(rdv)
  }

  // =============== DELETE ===============

  async deleteRendezvous(id: string, rdv: Rendezvous, user: User): Promise<void> {
    rdv.createdAt = new Date(rdv.createdAt);
    (rdv.lastUpdate && rdv.lastUpdate !== 'Not Updated') ? rdv.lastUpdate = new Date(rdv.lastUpdate) : null;
    rdv.rdvState = RendezvousStates.DELETED;
    rdv.deletedAt = new Date();
    rdv.deletedBy = user.email;
    return await this.fireStore.collection<Rendezvous>('Rendezvous').doc(id).update(rdv)
  }

  // =============== UPDATE ===============

  async updateRendezvous(id: string, rdv: Rendezvous): Promise<void> {
    rdv.lastUpdate = new Date();
    return await this.fireStore.collection<Rendezvous>('Rendezvous').doc(id).update(rdv)
  }

  async approveRendezvous(id: string, rdv: Rendezvous, user: User): Promise<void> {
    rdv.createdAt = new Date(rdv.createdAt);
    (rdv.lastUpdate && rdv.lastUpdate !== 'Not Updated') ? rdv.lastUpdate = new Date(rdv.lastUpdate) : null;
    rdv.rdvState = RendezvousStates.APPROVED;
    rdv.approvedAt = new Date();
    rdv.approvedBy = user.email;
    return await this.fireStore.collection<Rendezvous>('Rendezvous').doc(id).update(rdv)
  }

  async finishRendezvous(id: string, rdv: Rendezvous): Promise<void> {
    rdv.createdAt = new Date(rdv.createdAt);
    (rdv.lastUpdate && rdv.lastUpdate !== 'Not Updated') ? rdv.lastUpdate = new Date(rdv.lastUpdate) : null;
    rdv.approvedAt ? rdv.approvedAt = new Date(rdv.approvedAt) : null;
    rdv.rdvDate ? rdv.rdvDate = new Date(rdv.rdvDate) : null;
    rdv.rdvState = RendezvousStates.FINISHED;
    rdv.finishedAt = new Date();
    return await this.fireStore.collection<Rendezvous>('Rendezvous').doc(id).update(rdv)
  }

  async cancelRendezvous(id: string, rdv: Rendezvous, user: User): Promise<void> {
    rdv.createdAt = new Date(rdv.createdAt);
    (rdv.lastUpdate && rdv.lastUpdate !== 'Not Updated') ? rdv.lastUpdate = new Date(rdv.lastUpdate) : null;
    rdv.approvedAt ? rdv.approvedAt = new Date(rdv.approvedAt) : null;
    rdv.rdvDate ? rdv.rdvDate = new Date(rdv.rdvDate) : null;
    rdv.rdvState = RendezvousStates.CANCELED;
    rdv.canceledAt = new Date();
    rdv.canceledBy = user.email;
    return await this.fireStore.collection<Rendezvous>('Rendezvous').doc(id).update(rdv)
  }

  // =============== READ ===============

  getRDVsByState(stateOfRDV: RendezvousStates, orderBy: string): Observable<Rendezvous[]> {
    return this.fireStore.
      collection<Rendezvous>('Rendezvous', ref => ref
        .where('rdvState', '==', stateOfRDV)
        .orderBy(orderBy)
      )
      .snapshotChanges()
      .pipe(map(values => {
        let i = 1;
        return values.map(rdv => {
          const load = rdv.payload.doc.data();
          return {
            ...load,
            rdvID: rdv.payload.doc.id,
            createdAt: this.translatingService.convertToDateString(load.createdAt),
            lastUpdate: this.getLastUpdate(load.lastUpdate),
            rdvDate: load.rdvDate ? this.translatingService.convertToDateString(load.rdvDate) : undefined,
            approvedAt: load.approvedAt ? this.translatingService.convertToDateString(load.approvedAt) : undefined,
            finishedAt: load.finishedAt ? this.translatingService.convertToDateString(load.finishedAt) : undefined,
            canceledAt: load.canceledAt ? this.translatingService.convertToDateString(load.canceledAt) : undefined,
            deletedAt: load.deletedAt ? this.translatingService.convertToDateString(load.deletedAt) : undefined,
            order: i++
          }
        })
      }))
  }

  getRDVsByEmailAndState(usrMail: string, stateOfRDV: RendezvousStates, orderBy: string): Observable<Rendezvous[]> {
    return this.fireStore.
      collection<Rendezvous>('Rendezvous', ref => ref
        .where('createdBy', '==', usrMail)
        .where('rdvState', '==', stateOfRDV)
        .orderBy(orderBy)
      )
      .snapshotChanges()
      .pipe(map(values => {
        let i = 1;
        return values.map(rdv => {
          const load = rdv.payload.doc.data();
          return {
            ...load,
            rdvID: rdv.payload.doc.id,
            createdAt: this.translatingService.convertToDateString(load.createdAt),
            lastUpdate: this.getLastUpdate(load.lastUpdate),
            rdvDate: load.rdvDate ? this.translatingService.convertToDateString(load.rdvDate) : undefined,
            approvedAt: load.approvedAt ? this.translatingService.convertToDateString(load.approvedAt) : undefined,
            finishedAt: load.finishedAt ? this.translatingService.convertToDateString(load.finishedAt) : undefined,
            canceledAt: load.canceledAt ? this.translatingService.convertToDateString(load.canceledAt) : undefined,
            deletedAt: load.deletedAt ? this.translatingService.convertToDateString(load.deletedAt) : undefined,
            order: i++
          }
        })
      }))
  }

  getAllRendezvous(): Observable<Rendezvous[]> {
    return this.fireStore
      .collection<Rendezvous>('Rendezvous', ref => ref.orderBy('createdAt'))
      .snapshotChanges()
      .pipe(map(values => {
        let i = 1;
        return values.map(rdv => {
          const load = rdv.payload.doc.data();
          return {
            ...load,
            rdvID: rdv.payload.doc.id,
            createdAt: this.translatingService.convertToDateString(load.createdAt),
            lastUpdate: this.getLastUpdate(load.lastUpdate),
            rdvDate: load.rdvDate ? this.translatingService.convertToDateString(load.rdvDate) : undefined,
            approvedAt: load.approvedAt ? this.translatingService.convertToDateString(load.approvedAt) : undefined,
            finishedAt: load.finishedAt ? this.translatingService.convertToDateString(load.finishedAt) : undefined,
            canceledAt: load.canceledAt ? this.translatingService.convertToDateString(load.canceledAt) : undefined,
            deletedAt: load.deletedAt ? this.translatingService.convertToDateString(load.deletedAt) : undefined,
            order: i++
          }
        })
      }))
  }

  // =============== end of CRUD ===============

  getDocByID = (docID: string) => this.fireStore.collection<Rendezvous>('Rendezvous').doc(docID)

  private getLastUpdate(param: any): string {
    return (!param || (param === 'Not Updated')) ? 'Not Updated' : this.translatingService.convertToDateString(param)
  }

}
