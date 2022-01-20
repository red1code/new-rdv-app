import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

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

}
