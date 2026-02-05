import {Component, OnInit} from '@angular/core';
import {ProfileRequestService} from "../../services/profile/profile-request.service";
import {IProfile} from "../../interfaces/IProfile";
import {FormBuilder, Validators} from "@angular/forms";
import {AccRequestService} from "../../services/account/acc-request.service";
import {ISignin} from "../../interfaces/ISignin";
import {IPassword} from "../../interfaces/IPassword";
import {IMessageStatus} from "../../interfaces/IMessage";
import Swal from "sweetalert2";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  accountData?: ISignin;
  profileData?: IProfile;

  isAccountEditing: boolean = false;
  isProfileEditing: boolean = false;
  isPasswordEditing: boolean = false;

  messageAcc?: string;
  messsagePro?: string;
  messagePass?: string;
  messageStyle?: string;

  sexOptions = ['male', 'female', 'undefined' ];

  constructor(private httpProfile: ProfileRequestService,
              private httpAcc: AccRequestService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {

    this.httpProfile.getAccountProfile().subscribe({
      next: res => {
        this.accountData = res?.account;
        this.profileData = res?.profile;

        this.account.patchValue({
          username: res?.account?.username,
          email: res?.account?.email,
          password: res?.account?.password,
        })
        this.profile.patchValue({
          name: res?.profile?.name,
          sex: res?.profile?.sex,
          birthday: res?.profile?.birthday,
        })
      },
      error: error => {
        console.log(error);
      }
    })
  }

  account = this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  profile = this.fb.nonNullable.group({
    name: ['', Validators.required],
    sex: [''],
    birthday: new Date(),
  })

  pass = this.fb.nonNullable.group({
    oldPassword: ['', [Validators.required]],
    newPassword: ['', [Validators.required]],
  })

  updateAccount() {

    const { username, email, password } = this.account.getRawValue();
    const request: ISignin = {
      id: this.accountData?.id ? this.accountData?.id : undefined,
      username,
      email,
      password,
      role: 'User'
    }

    this.httpAcc.upDate(request).subscribe({
      next: (res: IMessageStatus) => {

        this.accountData = request;

        localStorage.setItem('token', res.message);

        Swal.fire({
          title: 'Account aggiornato con successo!',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            title: 'text-gray-300',
          },
          background: '#283444',
        }).then(() => {
          this.toggleAccountEditing();
        })

      },
      error: error => {

        setTimeout(() => {

          this.messageAcc = error?.error?.message || 'Errore generico, riprova più tardi.';
          this.messageStyle = 'error';

          setTimeout(() => {
            this.messageAcc = "";
            this.messageStyle = "";
          }, 3200)

        },100);
      }
    })
  }

  updateProfile() {

    const { name, sex, birthday } = this.profile.getRawValue();

    const request: IProfile = {
      id: this.profileData?.id ? this.profileData?.id : undefined,
      name,
      sex,
      birthday,
      animeIds: []
    }

    this.httpProfile.upDate(request).subscribe({
      next: (res: IProfile) => {

        this.profileData = res

        Swal.fire({
          title: 'Profile aggiornato con successo!',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            title: 'text-gray-300',
          },
          background: '#283444',
        }).then(() => {
          this.toggleProfileEditing();
        })

      },
      error: error => {

        setTimeout(() => {

          this.messsagePro = error?.error?.message || 'Errore generico, riprova più tardi.';
          this.messageStyle = 'text-red-500';

          setTimeout(() => {
            this.messsagePro = "";
            this.messageStyle = "";
          }, 3200);

        },100);
      }
    })
  }

  updatePassword(){

    const { oldPassword, newPassword } = this.pass.getRawValue();
    const request: IPassword = {
      oldPassword,
      newPassword,
    }

    this.httpAcc.changePassword(request).subscribe({

      next: (res: IMessageStatus) => {

        this.pass.reset();

        Swal.fire({
          title: res.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            title: 'text-gray-300',
          },
          background: '#283444',
        }).then(() => {
          this.togglePasswordEditing();
          this.toggleAccountEditing();
        })
        if (this.accountData) {
          this.accountData.password = newPassword;
        }

      },
      error: error => {

        setTimeout(() => {

          this.messagePass = error?.error?.message || 'Errore generico, riprova più tardi.';
          this.messageStyle = 'error';

          setTimeout(() => {
            this.messagePass = "";
            this.messageStyle = "";
          }, 3200);
        },100);

      }
    })
  }


  toggleAccountEditing() {
    this.isAccountEditing = !this.isAccountEditing;
  }

  cancelAccountEditing() {
    this.isAccountEditing = false;
    this.account.reset({
      username: this.accountData?.username,
      email: this.accountData?.email,
      password: this.accountData?.password,
    });
  }

  toggleProfileEditing() {
    this.isProfileEditing = !this.isProfileEditing;
  }

  cancelProfileEditing() {
    this.isProfileEditing = false;
    this.profile.reset({
      name: this.profileData?.name,
      sex: this.profileData?.sex,
      birthday: this.profileData?.birthday
    });
  }

  togglePasswordEditing(){
    this.isPasswordEditing = !this.isPasswordEditing;
  }

}
