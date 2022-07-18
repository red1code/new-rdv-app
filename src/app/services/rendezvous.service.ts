import { AngularFirestore, AngularFirestoreDocument, DocumentReference, DocumentSnapshot } from '@angular/fire/compat/firestore';
import { DataType, Rendezvous, RendezvousStates } from './../models/rendezvous';
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
    if (!currentUser.email) throw ('You need Email to create new Rendezvous!');
    rdv.createdAt = new Date();
    rdv.createdBy = currentUser.email;
    rdv.rdvState = RendezvousStates.PENDING;
    return await this.fireStore.collection<Rendezvous>('Rendezvous').add(rdv)
  }

  // =============== DELETE ===============

  async deleteRendezvous(id: string, user: User): Promise<void> {
    const newData: Partial<Rendezvous> = {
      rdvState: RendezvousStates.DELETED,
      deletedAt: new Date(),
      deletedBy: user.email as string
    }
    return await this.fireStore.collection<Rendezvous>('Rendezvous').doc(id).update(newData)
  }

  // =============== UPDATE ===============

  async updateRendezvous(id: string, data: Rendezvous): Promise<void> {
    const newData: Partial<Rendezvous> = {
      displayName: data.displayName,
      phoneNumber: data.phoneNumber,
      lastUpdate: new Date()
    }
    return await this.fireStore.collection<Rendezvous>('Rendezvous').doc(id).update(newData)
  }

  async approveRendezvous(id: string, rdvDate: string, user: User): Promise<void> {
    const newData: Partial<Rendezvous> = {
      rdvDate: new Date(rdvDate),
      rdvState: RendezvousStates.APPROVED,
      approvedAt: new Date(),
      approvedBy: user.email as string
    }
    return await this.fireStore.collection<Rendezvous>('Rendezvous').doc(id).update(newData)
  }

  async finishRendezvous(id: string): Promise<void> {
    const newData: Partial<Rendezvous> = {
      rdvState: RendezvousStates.FINISHED,
      finishedAt: new Date(),
    }
    return await this.fireStore.collection<Rendezvous>('Rendezvous').doc(id).update(newData)
  }

  async cancelRendezvous(id: string, user: User): Promise<void> {
    const newData: Partial<Rendezvous> = {
      rdvState: RendezvousStates.CANCELED,
      canceledAt: new Date(),
      canceledBy: user.email as string
    }
    return await this.fireStore.collection<Rendezvous>('Rendezvous').doc(id).update(newData)
  }

  // =============== READ ===============

  getRDVsByState(stateOfRDV: RendezvousStates, orderBy: string, type: DataType, paginationDoc?: any): Observable<Rendezvous[]> {
    return this.fireStore.
      collection<Rendezvous>('Rendezvous', ref => {
        const queries = ref.where('rdvState', '==', stateOfRDV).orderBy(orderBy).limit(5);
        if (type === 'NEXT') return queries.startAfter(paginationDoc);
        if (type === 'PREVIOUS') return queries.endBefore(paginationDoc);
        return queries
      })
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

  getDocByID(docID: string): AngularFirestoreDocument<Rendezvous> {
    return this.fireStore.collection<Rendezvous>('Rendezvous').doc(docID)
  }

  private getLastUpdate(param: any): string {
    return (!param || (param === 'Not Updated')) ? 'Not Updated' : this.translatingService.convertToDateString(param)
  }

}
