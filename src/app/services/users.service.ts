import { Observable, of, switchMap } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'src/app/models/user';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  user!: Observable<User | null | undefined>;

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore
  ) {
    this.getCurrentUser()
  }

  // get the current user
  getCurrentUser() {
    this.user = this.afAuth.authState.pipe(switchMap(user => {
      if (user) {
        return this.afStore.doc<User>(`profiles/${user.uid}`).valueChanges()
      } else {
        return of(null)
      }
    }))
  }

}



// THE END.
