import { User, ROLES } from './../../models/user';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { UserCredential } from '@firebase/auth-types';
import { FirebaseError } from 'firebase/app';
import { Observable, of, switchMap } from 'rxjs';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private fireStore: AngularFirestore
  ) { }

  // |=============== get infos ===============|

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

  // |=============== auth methods ===============|

  async vefifyPhoneNumberAndSignin(verificationCode: string) {
    const verificationId: string = JSON.parse(localStorage.getItem('verificationId') as string);
    const credentials = firebase.auth.PhoneAuthProvider.credential(verificationId, verificationCode);
    const userCredential = await this.afAuth.signInWithCredential(credentials);
    return userCredential?.additionalUserInfo?.isNewUser ??
      await this.createProfileInFirestore(userCredential.user as firebase.User)
  }

  async signinWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    return credential?.additionalUserInfo?.isNewUser ??
      await this.createProfileInFirestore(credential.user as firebase.User)
  }

  async createNewUser(user: User, userPassword: string): Promise<void> {
    const signup = await this.afAuth.createUserWithEmailAndPassword(user.email as string, userPassword);
    await signup.user?.sendEmailVerification();
    user.uid = signup.user?.uid;
    user.role = ROLES.PATIENT;
    user.created_at = new Date();
    user.imageURL = 'assets/unknown-profile-picture.jpg';
    await this.fireStore.doc('/profiles/' + user.uid).set(user)
  }

  // logIn with email & password
  async logIn(email: string, passord: string): Promise<UserCredential | FirebaseError> {
    return await this.afAuth.signInWithEmailAndPassword(email, passord)
  }

  // logOut
  logOut = (): Promise<void> => this.afAuth.signOut();

  // forgot password method
  async resetPassword(email: string): Promise<void> {
    return await this.afAuth.sendPasswordResetEmail(email)
  }

  private createProfileInFirestore(user: firebase.User) {
    const data: User = {
      uid: user.uid,
      email: user.email,
      imageURL: user.photoURL || 'assets/unknown-profile-picture.jpg',
      created_at: new Date(),
      firstName: user.displayName || 'User',
      phoneNumber: user.phoneNumber ? parseInt(user.phoneNumber) : null,
      role: ROLES.PATIENT,
    }
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.fireStore.doc(`profiles/${user.uid}`);
    return userRef.set(data, { merge: true })
  }

  // |=============== authorizations access based on users roles ===============|

  private checkAuthorization(user: User, allowedRoles: ROLES[]): boolean {
    if (!user) return false;
    for (let role of allowedRoles) {
      if (user.role === role) return true
    }
    return false
  }

  canRead(user: User): boolean {
    const allowed: ROLES[] = [ROLES.ADMIN, ROLES.MODERATOR, ROLES.PATIENT, ROLES.MEDECIN];
    return this.checkAuthorization(user, allowed)
  }

  canAccessDashboard(user: User): boolean {
    const allowed: ROLES[] = [ROLES.ADMIN, ROLES.MODERATOR, ROLES.MEDECIN];
    return this.checkAuthorization(user, allowed)
  }

  canCRUDrendezvous(user: User): boolean {
    const allowed: ROLES[] = [ROLES.ADMIN, ROLES.MODERATOR, ROLES.MEDECIN];
    return this.checkAuthorization(user, allowed)
  }

  canCRUDusers(user: User): boolean {
    const allowed: ROLES[] = [ROLES.ADMIN];
    return this.checkAuthorization(user, allowed)
  }

}

