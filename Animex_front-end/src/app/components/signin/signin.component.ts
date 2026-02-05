import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AccRequestService} from "../../services/account/acc-request.service";
import {FormBuilder, Validators} from "@angular/forms";
import {noWhitespaceValidator} from "../custom-validators/nonBlank";
import {ISignin} from "../../interfaces/ISignin";
import {IMessageStatus} from "../../interfaces/IMessage";
import Swal from "sweetalert2";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  message?: string;
  messageStyle?: string;

  constructor(private fb: FormBuilder,
              private router: Router,
              private httpAcc: AccRequestService, ) {
  }

  signin = this.fb.nonNullable.group({
    username: ['',[Validators.required, noWhitespaceValidator]],
    email: ['', [Validators.required, noWhitespaceValidator]],
    password: ['', [Validators.required, noWhitespaceValidator]]
  })


  signinData() {

    const {username, email, password} = this.signin.getRawValue();

    const request : ISignin =  {
      id: undefined,
      username,
      email,
      password,
      role: 'User'
    }

    this.httpAcc.signin(request).subscribe({
      next: (result: IMessageStatus) => {

        Swal.fire({
          title: result.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            title: 'text-gray-300',
          },
          background: '#283444'
        });

        setTimeout(() =>{
          this.router.navigate(['/login']);
        },1500)

      },
      error: (err) => {
        this.messageStyle = 'error';
        this.message = err?.error?.message || 'Errore generico, riprova più tardi.';

      }
    })

  }

}
