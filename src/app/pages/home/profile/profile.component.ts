import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, Observable, of } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user!: User;
  editProfilePopup = false;
  updateErrMsg = '';

  editPicPopup = false;
  uploading = false;
  persentage!: Observable<number | undefined>;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private afStorage: AngularFireStorage
  ) { }

  ngOnInit(): void {
    const uid = this.route.snapshot.params['id'];
    this.usersService.getCurrentProfile(uid).subscribe(value => {
      this.user = value as User;
    })
  }

  async updateProfile(data: User) {
    try {
      await this.usersService.updateProfile(this.user.uid as string, data);
      this.hideEditProfilePopUp();
      this.hideEditPicPopup();
    } catch (error) {
      this.updateErrMsg = error as string;
    }
  }

  uploadPhoto(event: any) {
    this.uploading = true;
    const filePath = `profile-pictures/${this.user.uid}`;
    const fileRef = this.afStorage.ref(filePath);
    const task = this.afStorage.upload(filePath, event.target.files[0]);
    this.persentage = task.percentageChanges();
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          if (url) {
            this.uploading = false;
            this.user.imageURL = url;
            this.updateProfile(this.user)
          }
        })
      })
    ).subscribe()
  }

  showEditProfilePopUp = () => this.editProfilePopup = true;

  showEditPicPopup = () => this.editPicPopup = true;

  hideEditProfilePopUp() {
    this.editProfilePopup = false;
    this.updateErrMsg = '';
  }

  hideEditPicPopup() {
    this.editPicPopup = false;
    this.uploading = false;
    this.updateErrMsg = '';
    this.persentage = of(undefined)
  }

}
