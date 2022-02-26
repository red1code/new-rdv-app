import { User, ROLES } from './../../models/user';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserCredential } from '@firebase/auth-types';
import { FirebaseError } from 'firebase/app';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private fireStore: AngularFirestore
  ) { }

  getUser() {
    return this.afAuth.authState
      .pipe(
        switchMap(auth => !auth ?
          of(null) :
          this.fireStore.doc<User>(`profiles/${auth.uid}`).valueChanges()
        )
      )
  }

  get isEmailVerified(): Observable<boolean> {
    return this.afAuth.authState.pipe(switchMap(auth => auth?.emailVerified ? of(true) : of(false)))
  }

  // signUp
  createNewUser(user: User, userPassword: string): Promise<void> {
    return this.afAuth.createUserWithEmailAndPassword(user.email, userPassword)
      .then((result: UserCredential) => {
        return [result.user?.uid, result.user?.sendEmailVerification()]
      })
      .then((param: (string | Promise<void> | undefined)[]) => {
        let id = param[0];
        user.uid = id as string;
        user.role = ROLES.PATIENT;
        user.created_at = new Date();
        user.imageURL = 'assets/unknown-profile-picture.jpg';
        return this.fireStore.doc('/profiles/' + user.uid).set(user)
      })
  }

  // createNewUser with async await method
  async createNewUser2(user: User, userPassword: string): Promise<void> {
    const signup = await this.afAuth.createUserWithEmailAndPassword(user.email, userPassword);
    await signup.user?.sendEmailVerification();
    user.uid = signup.user?.uid;
    user.role = ROLES.PATIENT;
    user.created_at = new Date();
    user.imageURL = 'assets/unknown-profile-picture.jpg';
    await this.fireStore.doc('/profiles/' + user.uid).set(user)
  }

  // logIn
  async logIn(email: string, passord: string): Promise<UserCredential | FirebaseError> {
    return await this.afAuth.signInWithEmailAndPassword(email, passord)
  }

  // logOut
  logOut = (): Promise<void> => this.afAuth.signOut();

  // forgot password method
  async resetPassword(email: string): Promise<void> {
    return await this.afAuth.sendPasswordResetEmail(email)
  }

  // authorizations access based on users roles
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
