import { User, ROLES } from './../../models/user';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserCredential } from '@firebase/auth-types'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  successAlert: boolean = false;

  constructor(
    private auth: AngularFireAuth,
    private fireStore: AngularFirestore
  ) { }

  createNewUser(user: User, userPassword: string): Promise<UserCredential | any> {
    return this.auth.createUserWithEmailAndPassword(user.email, userPassword)
      .then((result: UserCredential) => {
        result.user?.sendEmailVerification().then(() => {
          this.successAlert = true;
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
