import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Rendezvous } from 'src/app/models/rendezvous';

@Component({
  selector: 'app-rdv-form',
  templateUrl: './rdv-form.component.html',
  styleUrls: ['./rdv-form.component.css']
})
export class RdvFormComponent implements OnInit {

  @Input() rdv!: Rendezvous | null;

  @Output() rdvFormValue = new EventEmitter();
  @Output() deleteRDVid = new EventEmitter<string>();

  rdvID!: string;
  rdvform!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.rdvID = this.rdv?.rdvID as string;
    this.initForm()
  }

  initForm() {
    const nameInput = this.rdv?.displayName;
    const mobileInput = this.rdv?.phoneNumber;
    this.rdvform = this.formBuilder.group({
      displayName: [nameInput, [Validators.required, Validators.pattern(/.*\S.*/)]],
      phoneNumber: [mobileInput, [Validators.required, Validators.pattern(/^(\+213|0)?[0-9]{9}$/)]]
    })
  }

  submitForm() {
    if (this.rdvform.invalid) return;
    this.rdvFormValue.emit(this.rdvform.value)
  }

  deleteRDV() {
    this.deleteRDVid.emit(this.rdvID)
  }

}
