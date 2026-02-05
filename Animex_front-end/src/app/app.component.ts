import {Component, OnInit} from '@angular/core';
import {AccRequestService} from "./services/account/acc-request.service";
import {Router} from "@angular/router";
import {AuthService} from "./services/credentials/auth.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title: string = 'Animex_ag'

  constructor(private router: Router,
              private httpAcc: AccRequestService,
              private httpAuth: AuthService) {
  }

  ngOnInit(): void {
    this.httpAcc.isValidToken().subscribe(res =>{
      if(res.message.startsWith("Token valido")){
        return true;
      }else {
        Swal.fire({
          title: 'Sessione Scaduta',
          text: 'Devi accedere per continuare',
          icon: 'error',
          confirmButtonText: 'Accedi',
          customClass: {
            confirmButton: 'bg-[#C4BC60] hover:bg-[#B0A750] text-[#1a202c] px-4 py-2 rounded',
            title: 'text-gray-300',
            htmlContainer: 'text-gray-300'
          },
          background: '#283444'
        }).then((result) => {
          if (result.isConfirmed) {
            this.logout();
          }
        });
        return false;
      }
    })
    }

  logout(): void {
    this.httpAuth.logout();
    this.httpAcc.isAdmin.next(false)
    this.router.navigate(['/login']);
  }

}
