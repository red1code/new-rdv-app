import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { ApprovedRendezvous, Rendezvous } from './../models/rendezvous';
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
      .collection<Rendezvous>('Rendezvous', ref => ref.where('created_by', '==', usrEmail).orderBy('created_at'))
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

  // approveRDVs methods
  async addApprovedRDV(rdv: Rendezvous, rdvDate: string, currentUser: User): Promise<void | string> {
    const approvedRDV = this.getApprovedRDVobject(rdv, rdvDate, currentUser);
    try {
      await this.fireStore.collection<ApprovedRendezvous>('approved-rendezvous').add(approvedRDV);
      await this.fireStore.collection<Rendezvous>("Rendezvous").doc(rdv.rdvID).delete()
    }
    catch (error) {
      return error as string
    }
  }

  updateApprovedRDV(id: string, rdv: ApprovedRendezvous): Promise<void> {
    rdv.created_at = new Date(rdv.created_at);
    rdv.approvedAt = new Date(rdv.approvedAt);
    rdv.lastUpdate = new Date();
    return this.fireStore.collection<ApprovedRendezvous>('approved-rendezvous').doc(id).update(rdv)
  }

  deleteApprovedRDV(id: string): Promise<void> {
    return this.fireStore.collection<ApprovedRendezvous>('approved-rendezvous').doc(id).delete();
  }

  getApprovedRDVs(): Observable<ApprovedRendezvous[]> {
    return this.fireStore
      .collection<ApprovedRendezvous>('approved-rendezvous', ref => ref.orderBy('rdvDate'))
      .snapshotChanges()
      .pipe(map(results => {
        let i = 1;
        return results.map(rdv => {
          const load = rdv.payload.doc.data();
          return {
            ...load,
            rdvID: rdv.payload.doc.id,
            rdvDate: this.convertToDateString(load.rdvDate),
            approvedAt: this.convertToDateString(load.approvedAt),
            created_at: this.convertToDateString(load.created_at),
            lastUpdate: (load.lastUpdate === 'Not Updated') ? load.lastUpdate : this.convertToDateString(load.lastUpdate),
            order: i++
          }
        })
      }))
  }

  getApprovedRDVsByEmail(usrEmail: string): Observable<ApprovedRendezvous[]> {
    return this.fireStore
      .collection<ApprovedRendezvous>(
        'approved-rendezvous',
        ref => ref.where('created_by', '==', usrEmail).orderBy('rdvDate')
      ).snapshotChanges().pipe(map(values => {
        let i = 1;
        return values.map(rdv => {
          const load = rdv.payload.doc.data();
          return {
            ...load,
            rdvID: rdv.payload.doc.id,
            rdvDate: this.convertToDateString(load.rdvDate),
            approvedAt: this.convertToDateString(load.approvedAt),
            created_at: this.convertToDateString(load.created_at),
            lastUpdate: (load.lastUpdate === 'Not Updated') ? load.lastUpdate : this.convertToDateString(load.lastUpdate),
            order: i++
          }
        })
      }))
  }

  private getApprovedRDVobject(rdv: Rendezvous, rdvDt: string, currentUser: User): ApprovedRendezvous {
    return {
      displayName: rdv.displayName,
      phoneNumber: rdv.phoneNumber,
      created_by: rdv.created_by,
      created_at: new Date(rdv.created_at),
      lastUpdate: (rdv.lastUpdate === 'Not Updated') ? rdv.lastUpdate : new Date(rdv.lastUpdate),
      approvedBy: currentUser.email,
      approvedAt: new Date(),
      rdvDate: new Date(rdvDt)
    }
  }
  // End of approveRDVs methods.

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
