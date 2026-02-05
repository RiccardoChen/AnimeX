import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  logged = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.logged.asObservable();


  constructor() { }

  hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
  logout(): void {
    localStorage.removeItem('token');
    this.logged.next(false);
  }

  login(token: string): void {
    localStorage.setItem('token', token);
    this.logged.next(true);
  }
}
