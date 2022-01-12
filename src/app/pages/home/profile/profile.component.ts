import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user!: User;
  showEditTemplate: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.getProfile()
  }

  getProfile() {
    const uid = this.route.snapshot.params['id'];
    this.usersService.getCurrentProfile(uid).subscribe(value => {
      this.user = value as User;
    })
  }

  async updateProfile(data: FormGroup) {
    const val = data as any;
    await this.usersService.updateProfile(this.user.uid as string, val);
    this.hidePopUp()
  }

  showPopUp() {
    this.showEditTemplate = true
  }

  hidePopUp() {
    this.showEditTemplate = false
  }

  get joinedDate() {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return this.user.created_at.toDate().toLocaleString('en-US', options);
  }

}
