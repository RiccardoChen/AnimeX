import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {noWhitespaceValidator} from "../custom-validators/nonBlank";
import {ILogin} from "../../interfaces/ILogin";
import {AccRequestService} from "../../services/account/acc-request.service";
import {AuthService} from "../../services/credentials/auth.service";
import {Router} from "@angular/router";
import {ProfileDataService} from "../../services/profile/profile-data.service";
import {IMessage} from "../../interfaces/IMessage";
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  message?: string;
  messageStyle?: string;

  constructor(private fb: FormBuilder,
              private httpAcc: AccRequestService,
              private auth: AuthService,
              private router: Router,
              private profileData: ProfileDataService,) {
  }

  login = this.fb.nonNullable.group({
    email: ['', [Validators.required, noWhitespaceValidator]],
    password: ['', [Validators.required, noWhitespaceValidator]],
  })


  verifyData() {

    if (!this.login.valid) {

      Swal.fire({
        title: 'Login fallito!',
        icon: 'error',
        text: 'I campi email e password sono obbligatori',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          title: 'text-gray-300',
        },
        background: '#283444'
      });
      return;
    }

    const {email, password} = this.login.getRawValue();
    const request: ILogin = {
      email,
      password,
    }

    this.httpAcc.login(request).subscribe({
        next: (res: IMessage) => {

          this.auth.login(res.message)

          this.profileData.loadProfile();
          this.httpAcc.checkRole();

          Swal.fire({
            title: 'Login con successo!',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              title: 'text-gray-300',
            },
            background: '#283444'
          });

          setTimeout(() => {
            this.router.navigate(['/profile']);
          }, 1500);

        },
        error: (error) => {

          this.message = error?.error?.message || 'Errore generico, riprova più tardi.';
          this.messageStyle = 'error';
          setTimeout(() => {
            this.message = ""
          }, 2000)

        }
      }
    )


  }


}
