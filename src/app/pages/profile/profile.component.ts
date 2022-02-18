import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute } from '@angular/router';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { Observable, finalize, of } from 'rxjs';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';
import { dataUrlToFile } from 'src/app/utils/utilities';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user!: User;
  errorMsg = '';

  editProfilePopup = false;

  editPicPopup = false;
  imageFile: LoadedImage | null = null;
  croppedImage!: string | null;
  uploading = false;
  percentage!: Observable<number | undefined>;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private afStorage: AngularFireStorage
  ) { }

  ngOnInit(): void {
    const uid = this.route.snapshot.params['id'];
    this.usersService.getCurrentProfile(uid).subscribe(value => this.user = value as User)
  }

  async updateProfile(data: User) {
    try {
      await this.usersService.updateProfile(this.user.uid as string, data);
      this.hideEditProfilePopUp();
      this.hideEditPicPopup();
    } catch (error) {
      this.errorMsg = error as string;
    }
  }

  showEditProfilePopUp = () => this.editProfilePopup = true;

  hideEditProfilePopUp() {
    this.editProfilePopup = false;
    this.errorMsg = '';
  }

  hideEditPicPopup() {
    this.editPicPopup = false;
    this.uploading = false;
    this.errorMsg = '';
    this.percentage = of(undefined);
    this.imageFile = null;
    this.croppedImage = null;
  }

  // crop image
  fileChangeEvent(event: any): void {
    if (event.target.files[0]) {
      this.imageFile = event;
      this.errorMsg = ''
      this.editPicPopup = true;
    }
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64 as string;
  }

  loadImageFailed() {
    this.imageFile = null;
    this.errorMsg = 'Please, Load a valid image'
    setTimeout(() => { this.hideEditPicPopup() }, 3000)
  }

  saveImg() {
    this.uploadPhoto(this.croppedImage as string)
  }

  async uploadPhoto(event: string) {
    if (!event) return;
    this.uploading = true;
    const image = await dataUrlToFile(event);
    const filePath = `profile-pictures/${this.user.uid}`;
    const fileRef = this.afStorage.ref(filePath);
    const task = this.afStorage.upload(filePath, image);
    this.percentage = task.percentageChanges();
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          if (url) {
            this.user.imageURL = url;
            this.updateProfile(this.user).then(() => this.hideEditPicPopup())
          }
        })
      })
    ).subscribe();
  }

}
