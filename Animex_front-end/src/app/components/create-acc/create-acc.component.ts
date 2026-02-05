import {Component} from '@angular/core';
import {AccRequestService} from "../../services/account/acc-request.service";
import {Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {ISignin} from "../../interfaces/ISignin";
import {IMessageStatus} from "../../interfaces/IMessage";
import Swal from "sweetalert2";

export type LoadingStatus = 'none' | 'loading' | 'suc' | 'err';

@Component({
  selector: 'app-create-acc',
  templateUrl: './create-acc.component.html',
  styleUrls: ['./create-acc.component.css']
})
export class CreateAccComponent {


  roles: string[] = ['Admin', 'User'];
  message?: string;
  messageStyle?: string;
  isLoading: LoadingStatus = 'none';

  constructor(private httpAcc: AccRequestService,
              private router: Router,
              private fb: FormBuilder) {
  }

  accountForm = this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    role: ['', [Validators.required]]
  })

  createAccount() {
    const {username, email, password, role} = this.accountForm.getRawValue();
    const request: ISignin = {
      id: undefined,
      username,
      email,
      password,
      role
    }

    this.isLoading = 'loading';

    this.httpAcc.signin(request).subscribe({
        next: (res: IMessageStatus) => {

          Swal.fire({
            title: res.message,
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              title: 'text-gray-300',
            },
            background: '#283444',
          });

          this.httpAcc.all().subscribe({
            next: accs => {
              this.httpAcc.AllAcc.next(accs.content);
            }
          });

          setTimeout(() => {
            this.accountForm.reset();
            this.isLoading = 'none';
            this.back();
          }, 1500)

        },
        error: error => {
          this.message = error?.error?.message || 'Errore generico, riprova più tardi.';
          this.messageStyle = 'text-red-500';
          this.isLoading = 'err';
          setTimeout(() => {
            this.message = "";
            this.messageStyle = "";
            this.isLoading = 'none';
          }, 2000)
        }
      }
    )
  }

  back() {
    this.router.navigate(['/accounts']);
  }


}
