import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/models/user';
import { TranslatingService } from 'src/app/services/translating.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-part',
  templateUrl: './users-part.component.html',
  styleUrls: ['./users-part.component.css']
})
export class UsersPartComponent implements OnInit {

  user!: User;
  users!: User[]
  usrsCols = this.translatingService.getUsersCols();

  editProfilePopup = false;
  updateErrMsg = '';
  updateUser!: User | null;
  updateUID!: string | null;

  months = this.translatingService.getMonths();
  usrsPerMonth!: number[];

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private translate: TranslateService,
    private translatingService: TranslatingService
  ) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe(usr => this.user = usr as User);
    this.usersService.getAllUsers().subscribe(values => {
      // getting chart data:
      const usrsInEveryMonth = values.map(
        usr => new Date(usr.created_at).toLocaleString('en', { month: 'short' })
      );
      this.usrsPerMonth = this.translatingService.getEngMonths().map(
        month => usrsInEveryMonth.filter(val => val == month).length
      );
      // translating "created_at" and assigning data to users
      values.map(user => {
        user.created_at = this.translatingService.getTranslatedDate(user.created_at)
      });
      this.users = values;
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
