import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Rendezvous, RendezvousStates } from 'src/app/models/rendezvous';
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
  myApprovedRDVs!: Observable<Rendezvous[]>;
  myApprovedRDVsCols: TablesCols[] = [
    { title: 'Order', data: 'order' },
    { title: 'Display Name', data: 'displayName' },
    { title: 'Phone Number', data: 'phoneNumber' },
    { title: 'Created At', data: 'createdAt' },
    { title: 'Last Update', data: 'lastUpdate' },
    { title: 'Rendezvous Date', data: 'rdvDate' }
  ];
  myPendingRDVs!: Observable<Rendezvous[]>;
  myPendingRDVsCols: TablesCols[] = [
    { title: 'Order', data: 'order' },
    { title: 'Display Name', data: 'displayName' },
    { title: 'Phone Number', data: 'phoneNumber' },
    { title: 'Created At', data: 'createdAt' },
    { title: 'Last Update', data: 'lastUpdate' },
  ];
  halfwayPopup = false;
  updatePopup = false;
  rdv!: Rendezvous | null;
  errMsg = '';

  constructor(
    private authService: AuthService,
    private rdvService: RendezvousService
  ) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe(usr => {
      this.user = usr as User;

      this.myApprovedRDVs = this.rdvService.getApprovedRendezvousByEmail(this.user.email);
      this.myPendingRDVs = this.rdvService.getPendingRendezvousByEmail(this.user.email)
    })
  }

  showHalfwayPopup(data: Rendezvous) {
    this.rdv = data;
    this.halfwayPopup = true
  }

  proceedToUpdate() {
    this.halfwayPopup = false;
    this.updatePopup = true
  }

  get isPending() {
    return (this.rdv?.rdvState === RendezvousStates.PENDING) ? true : false
  }

  get isApproved() {
    return (this.rdv?.rdvState === RendezvousStates.APPROVED) ? true : false
  }

  async updateRendezvous(data: Rendezvous) {
    if (!this.rdv?.rdvID) return this.errMsg = 'Rendezvous not found';
    if (data.displayName === this.rdv.displayName && data.phoneNumber === this.rdv.phoneNumber)
      return this.hidePopup(); // no change was made.
    try {
      await this.rdvService.updateRendezvous(this.rdv.rdvID, data);
      return this.hidePopup()
    }
    catch (error) {
      this.errMsg = error as string
    }
  }

  async deleteRendezvous() {
    if (!this.rdv?.rdvID) return this.errMsg = 'Rendezvous ID not found';
    if (confirm(`Are you sure You want to delete this Rendezvous? \n
      - Name: ${this.rdv?.displayName} \n
      - Created At: ${this.rdv?.createdAt}`
    )) {
      try {
        await this.rdvService.deleteRendezvous(this.rdv.rdvID, this.rdv, this.user);
        return this.hidePopup()
      } catch (error) {
        this.errMsg = error as string
      }
    }
  }

  async cancelRendezvous() {
    if (!this.rdv?.rdvID) return this.errMsg = 'Rendezvous ID not found';
    if (confirm(`Are you sure You want to Call Off this Rendezvous? \n
      - Name: ${this.rdv?.displayName} \n
      - Created At: ${this.rdv?.createdAt}`
    )) {
      this.rdv.rdvState = RendezvousStates.CANCELED;
      try {
        await this.rdvService.cancelRendezvous(this.rdv.rdvID, this.rdv, this.user);
        return this.hidePopup()
      } catch (error) {
        this.errMsg = error as string
      }
    }
  }

  hidePopup() {
    this.halfwayPopup = false;
    this.updatePopup = false;
    this.rdv = null;
    this.errMsg = ''
  }

}
