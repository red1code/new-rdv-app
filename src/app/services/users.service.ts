import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { map, Observable } from 'rxjs';
import { TranslatingService } from './translating.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private afStore: AngularFirestore,
    private translatingService: TranslatingService
  ) { }

  getCurrentProfile(uid: string) {
    return this.afStore.doc<User>(`profiles/${uid}`).valueChanges()
  }

  async updateProfile(id: string, data: User): Promise<void> {
    await this.afStore.collection<User>('profiles').doc(id).update(data)
  }

  getAllUsers(): Observable<User[]> {
    return this.afStore
      .collection<User>('profiles', ref => ref.orderBy('created_at'))
      .valueChanges()
      .pipe(
        map(action => {
          return action.map(rdv => {
            return {
              ...rdv,
              created_at: this.translatingService.convertToDateString(rdv.created_at)
            }
          })
        })
      )
  }

}
