import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { RendezvousService } from './../../services/rendezvous.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Rendezvous } from 'src/app/models/rendezvous';

@Component({
  selector: 'app-new-rdv-form',
  templateUrl: './new-rdv-form.component.html',
  styleUrls: ['./new-rdv-form.component.css']
})
export class NewRdvFormComponent implements OnInit, OnChanges {

  @Output() showFormEvent = new EventEmitter<boolean>();
  @Input() userEmail!: string;
  @Input() id!: string;
  @Input() rdv!: Rendezvous;
  somethingWentWrong!: unknown;
  rdvform!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private rdvService: RendezvousService
  ) {
    this.initiateForm()
  }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rdv']) this.updateForm()
  }

  initiateForm() {
    this.rdvform = this.formBuilder.group({
      displayName: ['', [Validators.required, Validators.pattern(/.*\S.*/)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^(\+213|0)?[0-9]{9}$/)]],
    });
  }

  updateForm() {
    this.somethingWentWrong = '';
    this.rdvform = this.formBuilder.group({
      displayName: [this.rdv.displayName, [Validators.required, Validators.pattern(/.*\S.*/)]],
      phoneNumber: [this.rdv.phoneNumber, [Validators.required, Validators.pattern(/^(\+213|0)?[0-9]{9}$/)]],
    });
  }

  async submitRDVform() {
    if (this.rdvform.invalid) return;
    this.rdv = this.rdvform.value;
    if (this.id === '') { // id empty means it's a new RDV
      this.rdv.created_at = new Date();
      this.rdv.created_by = this.userEmail;
      try {
        await this.rdvService.creatNewRDV(this.rdv)
        this.updateFormStatus(false);
      } catch (error) {
        this.somethingWentWrong = error
      }
    } else { // here the id isn't empty, so it's an update of an existing RDV
      this.rdv.lastUpdate = new Date();
      try {
        await this.rdvService.updateRDV(this.id, this.rdv);
        this.updateFormStatus(false);
      } catch (error) {
        this.somethingWentWrong = error
      }
    }
  }

  async deleteRDV(id: string) {
    if (confirm('Are you sure You want to delete this Rendezvous?')) {
      try {
        await this.rdvService.eraseRDV(id);
        this.updateFormStatus(false);
      } catch (error) {
        this.somethingWentWrong = error
      }
    }
  }

  updateFormStatus(status: boolean): void {
    this.showFormEvent.emit(status);
  }

}
