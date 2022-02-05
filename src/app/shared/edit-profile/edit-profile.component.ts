import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ROLES, User } from 'src/app/models/user';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  @Input() profileInfos!: User | null;
  @Input() currentUser!: User;
  roles: string[] = [];
  editProfileForm!: FormGroup;
  @Output() updatedValues = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    Object.entries(ROLES).forEach(([key, value]) => this.roles.push(value))
  }

  ngOnInit(): void {
    this.editProfileForm = this.formBuilder.group({
      firstName: [this.profileInfos?.firstName, [Validators.required, Validators.pattern(/.*\S.*/)]],
      lastName: [this.profileInfos?.lastName, [Validators.required, Validators.pattern(/.*\S.*/)]],
      phoneNumber: [this.profileInfos?.phoneNumber, [Validators.required, Validators.pattern(/^(\+213|0)?[0-9]{9}$/)]],
      role: [this.profileInfos?.role, Validators.required]
    })
  }

  submitForm() {
    this.updatedValues.emit(this.editProfileForm.value)
  }

  get isAdmin() {
    return this.authService.canCRUDusers(this.currentUser)
  }

}
