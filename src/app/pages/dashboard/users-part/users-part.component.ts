import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { TablesCols } from 'src/app/models/tablesCols';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';
import { Months } from 'src/app/utils/utilities';

@Component({
  selector: 'app-users-part',
  templateUrl: './users-part.component.html',
  styleUrls: ['./users-part.component.css']
})
export class UsersPartComponent implements OnInit {

  user!: User;
  users!: User[]
  usrsCols: TablesCols[] = [
    { title: 'First Name', data: 'firstName' },
    { title: 'Last Name', data: 'lastName' },
    { title: 'Phone Number', data: 'phoneNumber' },
    { title: 'Email', data: 'email' },
    { title: 'Created At', data: 'created_at' },
    { title: 'Role', data: 'role' }
  ];
  editProfilePopup = false;
  updateErrMsg = '';
  updateUser!: User | null;
  updateUID!: string | null;

  months = Months;
  usrsPerMonth!: number[];

  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe(usr => this.user = usr as User);
    this.usersService.getAllUsers().subscribe(values => {
      this.users = values;
      // getting chart data:
      const usrsInEveryMonth = this.users.map(
        usr => new Date(usr.created_at).toLocaleString('en', { month: 'short' }));
      this.usrsPerMonth = this.months.map(
        month => usrsInEveryMonth.filter(val => val == month).length)
    })
  }

  get adminAccess() {
    return this.authService.canCRUDusers(this.user)
  }

  proceedToUpdate(data: User) {
    this.updateUser = data;
    this.showEditProfilePopUp()
  }

  async updateProfile(data: User) {
    try {
      await this.usersService.updateProfile(this.updateUser?.uid as string, data);
      this.hideEditProfilePopUp()
    } catch (error) {
      this.updateErrMsg = error as string
    }
  }

  hideEditProfilePopUp() {
    this.editProfilePopup = false;
    this.updateErrMsg = ''
  }

  showEditProfilePopUp = () => this.editProfilePopup = true;

}
