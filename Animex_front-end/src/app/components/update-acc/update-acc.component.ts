import {Component, OnInit} from '@angular/core';
import {AccRequestService} from "../../services/account/acc-request.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {IAccount, ISignin} from "../../interfaces/ISignin";
import {IPage} from "../../interfaces/IPage";
import Swal from "sweetalert2";
export type LoadingStatus = 'none' | 'loading' | 'suc' | 'err';

@Component({
  selector: 'app-update-acc',
  templateUrl: './update-acc.component.html',
  styleUrls: ['./update-acc.component.css']
})
export class UpdateAccComponent implements OnInit{

  accId?: number;
  message?: string;
  messageStyle?: string;
  isLoading: LoadingStatus = 'none';

  roles: string[] = ['Admin', 'User'];


  constructor(private httpAcc: AccRequestService,
              private router: Router,
              private fb: FormBuilder,
              private actRouter: ActivatedRoute,) {
  }

  ngOnInit() {
    const routeParams = this.actRouter.snapshot.paramMap;
    const accId = Number(routeParams.get('accId'));
    this.getAccId(accId);

  }

  updateAccForm = this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    role: ['', [Validators.required]]
  })

  getAccId(accId: number){
    this.httpAcc.getId(accId).subscribe({
      next: (res: IAccount) => {
        this.accId = res.id;
        this.updateAccForm.patchValue(res);
      },
      error: err => {
        console.log(err);
      }
    })
  }

  updateAcc(){

    const { username, email, password, role } = this.updateAccForm.getRawValue();
    const request: ISignin = {
      id: this.accId,
      username,
      email,
      password,
      role
    }

    this.isLoading = 'loading';
    this.httpAcc.upDate(request).subscribe({
      next: () => {

        Swal.fire({
          title: 'Account aggiornato con successo!',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            title: 'text-gray-300',
          },
          background: '#283444',
        });

        this.httpAcc.all().subscribe({
          next: (page: IPage<IAccount>) => {
            this.httpAcc.AllAcc.next(page.content);
          }
        });

        setTimeout(() => {
          this.isLoading = 'none';
          this.back();
        }, 1500);
      },
      error: err => {
        this.message = err.error?.message;
        this.messageStyle = 'text-red-500';
        this.isLoading = 'err';

        setTimeout(() => {
          this.message = "";
          this.messageStyle = "";
          this.isLoading = 'none';
        }, 1500);
      }
    })
  }

  back(){
    this.router.navigate(['/accounts']);
  }




}
