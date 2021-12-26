import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseError } from 'firebase/app';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  mailSent: boolean;
  firebaseErrorMessage!: string;
  forgotPasswordForm: FormGroup;

  constructor(
    private authService: AuthService,
    private angularFireAuth: AngularFireAuth
  ) {
    this.mailSent = false;
    this.forgotPasswordForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email])
    });
  }

  ngOnInit(): void {
    // if the user is logged in, update the form value with their email address
    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        this.forgotPasswordForm.patchValue({
          email: user.email
        });
      }
    });
  }

  async retrievePassword() {
    const isFirebaseError = (x: any): x is FirebaseError => typeof x.message === 'string';
    try {
      await this.authService.resetPassword(this.forgotPasswordForm.value.email);
      this.mailSent = true;
    } catch (error) {
      if (isFirebaseError(error)) this.firebaseErrorMessage = error.message
    }
  }

}
