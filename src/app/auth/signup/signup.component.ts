import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  isFormSubmitted: boolean = false;
  signupForm: FormGroup;
  errorMessage!: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern(/.*\S.*/)]],
      lastName: ['', [Validators.required, Validators.pattern(/.*\S.*/)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^(\+213|0)?[0-9]{9}$/)]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  ngOnInit(): void { }

  onSubmitForm() {
    this.isFormSubmitted = true;
    if (this.signupForm.invalid) return;
    let password = this.signupForm.controls['password'].value;
    let formValues = this.signupForm.value;
    delete formValues.password;
    this.authService.createNewUser(formValues, password)
      .then(() => this.router.navigate(['/home']))
      .catch((error) => this.errorMessage = error.message)
    this.isFormSubmitted = false;
  }

}
