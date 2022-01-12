import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  @Input() profileInfos!: User;
  @Output() updatedValues = new EventEmitter<FormGroup>();

  editProfileForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.editProfileForm = this.formBuilder.group({
      firstName: [this.profileInfos.firstName, [Validators.required, Validators.pattern(/.*\S.*/)]],
      lastName: [this.profileInfos.lastName, [Validators.required, Validators.pattern(/.*\S.*/)]],
      phoneNumber: [this.profileInfos.phoneNumber, [Validators.required, Validators.pattern(/^(\+213|0)?[0-9]{9}$/)]]
    })
  }

  submitForm() {
    this.updatedValues.emit(this.editProfileForm.value)
  }

}
