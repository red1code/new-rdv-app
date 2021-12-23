import { User, ROLES } from './../../models/user';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserCredential } from '@firebase/auth-types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  successAlert: boolean = false;

  constructor(
    private auth: AngularFireAuth,
    private fireStore: AngularFirestore
  ) { }

  createNewUser(user: User, userPassword: string): Promise<void> {
    return this.auth.createUserWithEmailAndPassword(user.email, userPassword)
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
        this.fireStore.doc('/profiles/' + user.uid).set(user);
      })
  }

  // createNewUser with async await method
  async createNewUser2(user: User, userPassword: string): Promise<void> {
    const signup = await this.auth.createUserWithEmailAndPassword(user.email, userPassword);
    await signup.user?.sendEmailVerification();
    this.successAlert = true;
    user.uid = signup.user?.uid;
    user.role = ROLES.PATIENT;
    user.created_at = new Date();
    user.imageURL = 'assets/unknown-profile-picture.png';
    await this.fireStore.doc('/profiles/' + user.uid).set(user)
  }

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
