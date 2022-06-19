import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { isFirebaseError } from 'src/app/utils/utilities';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: UntypedFormGroup;
  errorMessage!: string;

  showPhoneTemplate = false;

  constructor(
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private authService: AuthService,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    })
  }

  ngOnInit(): void {
    this.authService.getUser().subscribe(usr => {
      if (usr) this.router.navigate(['home'])
    })
  }

  async onSubmitForm() {
    const email = this.loginForm.controls['email'].value;
    const password = this.loginForm.controls['password'].value;
    try {
      await this.authService.logIn(email, password);
      this.router.navigate(['home'])
    } catch (error) {
      if (isFirebaseError(error)) this.errorMessage = error.message
    }
  }

  async loginWithGoogle() {
    try {
      await this.authService.signinWithGoogle()
    }
    catch (error) {
      this.errorMessage = error as string
    }
  }

}
