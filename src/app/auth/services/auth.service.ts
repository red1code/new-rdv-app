import { User, ROLES } from './../../models/user';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { UserCredential } from '@firebase/auth-types'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: AngularFireAuth,
    private fireStore: AngularFirestore
  ) { }

  createNewUser(user: User, userPassword: string): Promise<UserCredential | any> {
    return this.auth.createUserWithEmailAndPassword(user.email, userPassword)
      .then((result: UserCredential) => {
        result.user?.sendEmailVerification().then(() => {
          alert('You have successfully signed up.\nAn email verification link has been sent to your email adresse.');
        }).catch((error): any => {
          if (error.code)
            return {
              emailVerificationError: true,
              message: error.message,
            };
        });
        user.role = ROLES.PATIENT;
        user.uid = result.user?.uid;
        user.created_at = new Date();
        user.imageURL = 'assets/unknown-profile-picture.png';
        this.fireStore.doc('/profiles/' + user.uid).set(user)
      })
      .catch((error): any => {
        if (error.code)
          return {
            firebaseError: true,
            message: error.message,
          };
      });
  }

  // authorization access based on users roles
  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) return false;
    for (let role of allowedRoles) {
      if (user.role === role) return true
    }
    return false
  }

  canRead(user: User): boolean {
    const allowed = ['Admin', 'Editor', 'Analyst', 'Subscriber'];
    return this.checkAuthorization(user, allowed)
  }

  canAccessDashboard(user: User): boolean {
    const allowed = ['Admin', 'Editor', 'Analyst'];
    return this.checkAuthorization(user, allowed)
  }

  canCRUDrendezvous(user: User): boolean {
    const allowed = ['Admin', 'Editor'];
    return this.checkAuthorization(user, allowed)
  }

  canCRUDusers(user: User): boolean {
    const allowed = ['Admin'];
    return this.checkAuthorization(user, allowed)
  }

}
