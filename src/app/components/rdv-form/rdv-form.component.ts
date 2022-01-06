import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RendezvousService } from '../../services/rendezvous.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Rendezvous } from 'src/app/models/rendezvous';

@Component({
  selector: 'app-rdv-form',
  templateUrl: './rdv-form.component.html',
  styleUrls: ['./rdv-form.component.css']
})
export class RdvFormComponent implements OnInit {

  @Input() rdv!: Rendezvous;
  @Input() userEmail!: string;
  @Output() formOff = new EventEmitter();

  rdvID!: string;
  rdvform!: FormGroup;
  somethingWentWrong!: string;

  constructor(
    private formBuilder: FormBuilder,
    private rdvService: RendezvousService
  ) { }

  ngOnInit(): void {
    this.rdvID = this.rdv.rdvID as string;
    this.initForm()
  }

  initForm() {
    const nameInput = this.rdv.displayName;
    const mobileInput = this.rdv.phoneNumber;
    this.rdvform = this.formBuilder.group({
      displayName: [nameInput, [Validators.required, Validators.pattern(/.*\S.*/)]],
      phoneNumber: [mobileInput, [Validators.required, Validators.pattern(/^(\+213|0)?[0-9]{9}$/)]]
    })
  }

  closeForm(): void {
    this.formOff.emit();
  }

  async submitRDVform() {
    if (this.rdvform.invalid) return;
    const formValues = this.rdvform.value;
    if (!this.rdvID) { // id empty means it's a new RDV
      formValues.created_at = new Date();
      formValues.created_by = this.userEmail;
      try {
        await this.rdvService.creatNewRDV(formValues)
        this.closeForm();
      }
      catch (error) {
        this.somethingWentWrong = error as string
      }
    }
    else if (this.rdvID) { // here the id isn't empty, so it's an update of an existing RDV
      formValues.lastUpdate = new Date();
      try {
        await this.rdvService.updateRDV(this.rdvID, formValues);
        this.closeForm();
      }
      catch (error) {
        this.somethingWentWrong = error as string
      }
    }
  }

  async deleteRDV() {
    if (confirm('Are you sure You want to delete this Rendezvous?')) {
      try {
        await this.rdvService.eraseRDV(this.rdvID);
        this.closeForm();
      } catch (error) {
        this.somethingWentWrong = error as string
      }
    }
  }

}
