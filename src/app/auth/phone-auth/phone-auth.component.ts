import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { AuthService } from '../services/auth.service';
import { UntypedFormGroup, Validators, UntypedFormBuilder } from '@angular/forms';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';


@Component({
  selector: 'app-phone-auth',
  templateUrl: './phone-auth.component.html',
  styleUrls: ['./phone-auth.component.css']
})
export class PhoneAuthComponent implements OnInit {

  searchCountryField = SearchCountryField;
  countryISO = CountryISO;
  phoneNumberFormat = PhoneNumberFormat;
  phoneForm: UntypedFormGroup;

  reCaptchaVerifier!: firebase.auth.ApplicationVerifier;
  sendingCode = false;
  codeSent = false;
  verificationCode!: string;

  errMsg: any;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private formBuilder: UntypedFormBuilder,
    private authService: AuthService
  ) {
    this.phoneForm = this.formBuilder.group({
      phone: [undefined, [Validators.required]]
    });
  }

  ngOnInit(): void { }

  async sendVerificationCode() {
    const inputVal = this.phoneForm.controls['phone'].value;

    if (!inputVal) {
      this.errMsg = 'Input field is empty!';
      return
    };

    try {
      this.sendingCode = true;
      this.reCaptchaVerifier = new firebase.auth.RecaptchaVerifier('reCaptcha-container', { size: 'invisible' });
      const credential = await this.afAuth.signInWithPhoneNumber(inputVal.e164Number, this.reCaptchaVerifier);
      localStorage.setItem('verificationId', JSON.stringify(credential.verificationId))
      this.codeSent = true;
    }
    catch (error) {
      this.errMsg = error;
    }
    this.sendingCode = false;
  }

  async vefifyLoginCode() {
    try {
      await this.authService.vefifyPhoneNumberAndSignin(this.verificationCode);
      this.router.navigate(['home']);
      this.codeSent = false
    }
    catch (error) {
      this.errMsg = error
    }
  }

}
