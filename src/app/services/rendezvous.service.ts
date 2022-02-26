import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { Rendezvous, RendezvousStates } from './../models/rendezvous';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class RendezvousService {

  constructor(private fireStore: AngularFirestore) { }

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

  getPendingRendezvous(): Observable<Rendezvous[]> {
    return this.fireStore
      .collection<Rendezvous>('Rendezvous',
        ref => ref.where('rdvState', '==', RendezvousStates.PENDING).orderBy('createdAt')
      )
      .snapshotChanges()
      .pipe(map(values => {
        let i = 1;
        return values.map(rdv => {
          const load = rdv.payload.doc.data();
          return {
            ...load,
            rdvID: rdv.payload.doc.id,
            createdAt: this.convertToDateString(load.createdAt),
            lastUpdate: this.getLastUpdate(load.lastUpdate),
            order: i++
          }
        })
      }))
  }

  getApprovedRendezvous(): Observable<Rendezvous[]> {
    return this.fireStore
      .collection<Rendezvous>('Rendezvous',
        ref => ref.where('rdvState', '==', RendezvousStates.APPROVED).orderBy('rdvDate')
      )
      .snapshotChanges()
      .pipe(map(values => {
        let i = 1;
        return values.map(rdv => {
          const load = rdv.payload.doc.data();
          return {
            ...load,
            rdvID: rdv.payload.doc.id,
            createdAt: this.convertToDateString(load.createdAt),
            lastUpdate: this.getLastUpdate(load.lastUpdate),
            approvedAt: this.convertToDateString(load.approvedAt),
            rdvDate: this.convertToDateString(load.rdvDate),
            order: i++
          }
        })
      }))
  }

  getFinishedRendezvous(): Observable<Rendezvous[]> {
    return this.fireStore
      .collection<Rendezvous>('Rendezvous',
        ref => ref.where('rdvState', '==', RendezvousStates.FINISHED).orderBy('finishedAt')
      )
      .snapshotChanges()
      .pipe(map(values => {
        let i = 1;
        return values.map(rdv => {
          const load = rdv.payload.doc.data();
          return {
            ...load,
            rdvID: rdv.payload.doc.id,
            createdAt: this.convertToDateString(load.createdAt),
            lastUpdate: this.getLastUpdate(load.lastUpdate),
            approvedAt: this.convertToDateString(load.approvedAt),
            rdvDate: this.convertToDateString(load.rdvDate),
            finishedAt: this.convertToDateString(load.finishedAt),
            order: i++
          }
        })
      }))
  }

  getCanceledRendezvous(): Observable<Rendezvous[]> {
    return this.fireStore
      .collection<Rendezvous>('Rendezvous',
        ref => ref.where('rdvState', '==', RendezvousStates.CANCELED).orderBy('createdAt')
      )
      .snapshotChanges()
      .pipe(map(values => {
        let i = 1;
        return values.map(rdv => {
          const load = rdv.payload.doc.data();
          return {
            ...load,
            rdvID: rdv.payload.doc.id,
            createdAt: this.convertToDateString(load.createdAt),
            lastUpdate: this.getLastUpdate(load.lastUpdate),
            approvedAt: this.convertToDateString(load.approvedAt),
            rdvDate: this.convertToDateString(load.rdvDate),
            canceledAt: this.convertToDateString(load.canceledAt),
            order: i++
          }
        })
      }))
  }

  getDeletedRendezvous(): Observable<Rendezvous[]> {
    return this.fireStore
      .collection<Rendezvous>('Rendezvous',
        ref => ref.where('rdvState', '==', RendezvousStates.DELETED).orderBy('createdAt')
      )
      .snapshotChanges()
      .pipe(map(values => {
        let i = 1;
        return values.map(rdv => {
          const load = rdv.payload.doc.data();
          return {
            ...load,
            rdvID: rdv.payload.doc.id,
            createdAt: this.convertToDateString(load.createdAt),
            lastUpdate: this.getLastUpdate(load.lastUpdate),
            deletedAt: this.convertToDateString(load.deletedAt),
            order: i++
          }
        })
      }))
  }

  getPendingRendezvousByEmail(usrEmail: string): Observable<Rendezvous[]> {
    return this.fireStore
      .collection<Rendezvous>('Rendezvous',
        ref => ref.where('createdBy', '==', usrEmail)
          .where('rdvState', '==', RendezvousStates.PENDING)
          .orderBy('createdAt')
      )
      .snapshotChanges().pipe(map(values => {
        let i = 1;
        return values.map(rdv => {
          const load = rdv.payload.doc.data();
          return {
            ...load,
            rdvID: rdv.payload.doc.id,
            createdAt: this.convertToDateString(load.createdAt),
            lastUpdate: this.getLastUpdate(load.lastUpdate),
            order: i++
          }
        })
      }))
  }

  getApprovedRendezvousByEmail(usrEmail: string): Observable<Rendezvous[]> {
    return this.fireStore
      .collection<Rendezvous>('Rendezvous',
        ref => ref.where('createdBy', '==', usrEmail)
          .where('rdvState', '==', RendezvousStates.APPROVED)
          .orderBy('rdvDate')
      )
      .snapshotChanges().pipe(map(values => {
        let i = 1;
        return values.map(rdv => {
          const load = rdv.payload.doc.data();
          return {
            ...load,
            rdvID: rdv.payload.doc.id,
            createdAt: this.convertToDateString(load.createdAt),
            lastUpdate: this.getLastUpdate(load.lastUpdate),
            approvedAt: this.convertToDateString(load.approvedAt),
            rdvDate: this.convertToDateString(load.rdvDate),
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
            createdAt: this.convertToDateString(load.createdAt),
            lastUpdate: this.getLastUpdate(load.lastUpdate),
            approvedAt: load.approvedAt ? this.convertToDateString(load.approvedAt) : 'Not Approved',
            rdvDate: load.rdvDate ? this.convertToDateString(load.rdvDate) : 'No Date',
            finishedAt: load.finishedAt ? this.convertToDateString(load.finishedAt) : 'Not Finished',
            canceledAt: load.canceledAt ? this.convertToDateString(load.canceledAt) : 'Not Canceled',
            deletedAt: load.deletedAt ? this.convertToDateString(load.deletedAt) : 'Not Deleted',
            order: i++
          }
        })
      }))
  }

  // =============== end of CRUD ===============

  private getLastUpdate(param: any): string {
    return (!param || (param === 'Not Updated')) ? 'Not Updated' : this.convertToDateString(param)
  }

  private convertToDateString(param: any): string {
    return param.toDate().toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      // hour12: false
    })
  }

}
