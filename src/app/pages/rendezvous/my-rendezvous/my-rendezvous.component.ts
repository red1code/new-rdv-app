import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Rendezvous } from 'src/app/models/rendezvous';
import { TablesCols } from 'src/app/models/tablesCols';
import { User } from 'src/app/models/user';
import { RendezvousService } from 'src/app/services/rendezvous.service';

@Component({
  selector: 'app-my-rendezvous',
  templateUrl: './my-rendezvous.component.html',
  styleUrls: ['./my-rendezvous.component.css']
})
export class MyRendezvousComponent implements OnInit {


  user!: User;
  myRDVs!: Observable<Rendezvous[]>;
  rdvCol: TablesCols[] = [
    { title: 'Order', data: 'order' },
    { title: 'Display Name', data: 'displayName' },
    { title: 'Phone Number', data: 'phoneNumber' },
    { title: 'Created At', data: 'created_at' },
    { title: 'Last Update', data: 'lastUpdate' },
  ];
  showForm: boolean = false;
  rdv!: Rendezvous | null;
  formErrorMsg!: string;

  constructor(
    private authService: AuthService,
    private rdvService: RendezvousService
  ) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe(usr => {
      this.user = usr as User;
      this.myRDVs = this.rdvService.getRDVsByEmail(this.user.email)
    })
  }

  proceedToUpdate(data: Rendezvous) {
    this.rdv = data;
    this.showForm = true;
  }

  async submitRDVform(data: any) {
    const formValues = data;
    try {
      await this.rdvService.updateRDV(this.rdv?.rdvID as string, formValues);
      this.hidePopupForm()
    }
    catch (error) {
      this.formErrorMsg = error as string
    }
  }

  async deleteRDV(id: string) {
    if (confirm('Are you sure You want to delete this Rendezvous?')) {
      try {
        await this.rdvService.eraseRDV(id);
        this.hidePopupForm();
      } catch (error) {
        this.formErrorMsg = error as string
      }
    }
  }

  showPopupForm = () => this.showForm = true;

  hidePopupForm() {
    this.showForm = false;
    this.rdv = null;
  }

}
