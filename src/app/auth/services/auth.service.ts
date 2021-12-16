import { User } from './../../models/user';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: AngularFireAuth,
    private fireStore: AngularFirestore
  ) { }

  async createNewUser(user: User, userPassword: string): Promise<any> {
    return await this.auth.createUserWithEmailAndPassword(user.email, userPassword)
      .then((result: any) => {
        result.user.sendEmailVerification();
        user.role = 'subscriber';
        user.uid = result.user.uid;
        user.created_at = new Date();
        user.imageURL = 'assets/unknown-profile-picture.png';
        this.fireStore.doc('/profiles/' + user.uid).set(user)
      }).catch((error): any => {
        console.log('Auth Service: signup error', error);
        if (error.code)
          return {
            isValid: false,
            message: error.message,
            code: error.code
          };
      });
  }
}
