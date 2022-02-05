import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private afStore: AngularFirestore) { }

  getCurrentProfile(uid: string) {
    return this.afStore.doc<User>(`profiles/${uid}`).valueChanges()
  }

  updateProfile(id: string, data: User): Promise<void> {
    return this.afStore.collection<User>('profiles').doc(id).update(data)
  }

  getAllUsers(): Observable<User[]> {
    return this.afStore.collection<User>('profiles', ref => ref.orderBy('created_at'))
      .valueChanges()
      .pipe(
        map(action => {
          return action.map(rdv => {
            return {
              ...rdv,
              created_at: this.convertToDateString(rdv.created_at)
            }
          })
        })
      )
  }

  private convertToDateString(param: any): string {
    return param.toDate().toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

}
