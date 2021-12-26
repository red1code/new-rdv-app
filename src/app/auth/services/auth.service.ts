import { Observable, switchMap } from 'rxjs';
import { User, ROLES } from './../../models/user';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserCredential } from '@firebase/auth-types';
import { FirebaseError } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  successAlert: boolean = false;

  constructor(
    private afAuth: AngularFireAuth,
    private fireStore: AngularFirestore
  ) { }

  // signUp
  createNewUser(user: User, userPassword: string): Promise<void> {
    return this.afAuth.createUserWithEmailAndPassword(user.email, userPassword)
      .then((result: UserCredential) => {
        return [result.user?.uid, result.user?.sendEmailVerification()]
      })
      .then((param: (string | Promise<void> | undefined)[]) => {
        this.successAlert = true;
        let id = param[0];
        user.uid = id as string;
        user.role = ROLES.PATIENT;
        user.created_at = new Date();
        user.imageURL = 'assets/unknown-profile-picture.png';
        return this.fireStore.doc('/profiles/' + user.uid).set(user)
      })
  }

  // createNewUser with async await method
  async createNewUser2(user: User, userPassword: string): Promise<void> {
    const signup = await this.afAuth.createUserWithEmailAndPassword(user.email, userPassword);
    await signup.user?.sendEmailVerification();
    this.successAlert = true;
    user.uid = signup.user?.uid;
    user.role = ROLES.PATIENT;
    user.created_at = new Date();
    user.imageURL = 'assets/unknown-profile-picture.png';
    await this.fireStore.doc('/profiles/' + user.uid).set(user)
  }

  // logIn
  async logIn(email: string, passord: string): Promise<UserCredential | FirebaseError> {
    return await this.afAuth.signInWithEmailAndPassword(email, passord)
  }

  // logOut
  logOut = (): Promise<void> => this.afAuth.signOut();







  // authorization access based on users roles
  private checkAuthorization(user: User, allowedRoles: ROLES[]): boolean {
    if (!user) return false;
    for (let role of allowedRoles) {
      if (user.role === role) return true
    }
    return false
  }

  canRead(user: User): boolean {
    const allowed: ROLES[] = [ROLES.ADMIN, ROLES.MODERATOR, ROLES.PATIENT];
    return this.checkAuthorization(user, allowed)
  }

  canAccessDashboard(user: User): boolean {
    const allowed: ROLES[] = [ROLES.ADMIN, ROLES.MODERATOR];
    return this.checkAuthorization(user, allowed)
  }

  canCRUDrendezvous(user: User): boolean {
    const allowed: ROLES[] = [ROLES.ADMIN, ROLES.MODERATOR];
    return this.checkAuthorization(user, allowed)
  }

  canCRUDusers(user: User): boolean {
    const allowed: ROLES[] = [ROLES.ADMIN];
    return this.checkAuthorization(user, allowed)
  }

}

// THE END.



/*

import { FirebaseError } from 'firebase/app';

*/
