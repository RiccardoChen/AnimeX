import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AccRequestService} from "../../services/account/acc-request.service";
import {IAccount} from "../../interfaces/ISignin";
import {IPage} from "../../interfaces/IPage";
import {IMessageStatus} from "../../interfaces/IMessage";
import Swal from "sweetalert2";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  accounts: IAccount[] = [];
  searchName: string = '';
  accNameList: string[] = [];
  page: number = 0;
  totalPages: number = 0;

  constructor(public router: Router,
              private httpAcc: AccRequestService) {
  }

  ngOnInit(): void {

    this.httpAcc.AllAcc$.subscribe({
      next: (data: IAccount[] | null): void => {
        if (data) this.accounts = data;
      }
    });
    this.allAcc();
  }

  allAcc(username: string = "", page: number = 0): void {

    const request = {
      username: username,
      page: page,
    }
    this.httpAcc.all(request).subscribe({
      next: (res: IPage<IAccount>): void => {
        this.totalPages = res.totPages;
        this.httpAcc.AllAcc.next(res.content);
      },
      error: err => {
        console.log(err);
      }
    })

  }

  deleteAcc(id: number | undefined): void {
    this.httpAcc.deleteAcc(id).subscribe({
      next: () => {

        Swal.fire({
          title: 'Account cancellato con successo!',
          icon: 'success',
          showConfirmButton: false,
          timer: 1000,
          customClass: {
            title: 'text-gray-300',
          },
          background: '#283444'
        });

        this.httpAcc.all().subscribe({
          next: (r:IPage<IAccount>): void => this.httpAcc.AllAcc.next(r.content)
        });
      },
      error: err => {
        console.log(err?.error?.message || 'Errore generico, riprova più tardi.');
      }
    })
  }

  deleteConferm(id: number | undefined){
    Swal.fire({
      title: "Sei sicuro di cancellare questo account?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      reverseButtons: true,
      confirmButtonText: "Cancella",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteAcc(id);
      }
    });
  }


  suggestsAccName(): void {

    if (this.searchName.trim() === '') {
      this.allAcc()
      this.accNameList = []
    } else {
      this.accNameList = [];
      this.httpAcc.findAccName(this.searchName).subscribe({
        next: (res: string[]): void => {
          this.accNameList = res;
        },
        error: err => {
          console.log(err);
        }
      })
    }

  }

  onSelectAcc(name: string): void {
    this.searchName = name;
    this.allAcc(name, 0);
    this.accNameList = [];
  }

  onSearch(): void {
    this.allAcc(this.searchName, 0);
    return;
  }

  goPrev(): void {
    if (this.page > 0) {
      this.page--;
      this.allAcc(this.searchName, this.page);
    }
  }

  goNext(): void {
    if (this.page + 1 < this.totalPages) {
      this.page++;
      this.allAcc(this.searchName, this.page);
    }
  }

  getRoleClasses(role: string): string {
    switch (role) {
      case 'Admin':
        return 'bg-red-500/10 text-red-400 border border-red-400/30';
      case 'User':
        return 'bg-blue-500/10 text-blue-400 border border-blue-400/30';
      default:
        return 'bg-gray-700 text-gray-300 border border-gray-500/30';
    }
  }



}
