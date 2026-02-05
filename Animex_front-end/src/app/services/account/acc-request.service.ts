import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {ILogin} from "../../interfaces/ILogin";
import {BehaviorSubject, Observable} from "rxjs";
import {IAccount, ISignin} from "../../interfaces/ISignin";
import {IPassword} from "../../interfaces/IPassword";
import {IMessage, IMessageRole, IMessageStatus} from "../../interfaces/IMessage";
import {IPage} from "../../interfaces/IPage";
import {List} from "postcss/lib/list";

@Injectable({
  providedIn: 'root'
})
export class AccRequestService {

  private readonly AccUrl: string = 'http://localhost:8080/AnimeX/Account';

  constructor(private http: HttpClient) {
    this.checkRole();
  }

  isAdmin = new BehaviorSubject<boolean>(false);
  isAdmin$ = this.isAdmin.asObservable();

  AllAcc = new BehaviorSubject<IAccount[] | null>(null);
  AllAcc$ = this.AllAcc.asObservable();

  getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': localStorage.getItem("token") || ""
    });
  }

  login(log: ILogin): Observable<IMessage> {
    return this.http.post<IMessage>(`${this.AccUrl}/logIn`, log, {responseType: 'json'})
  }

  signin(sign: ISignin): Observable<IMessageStatus> {
    return this.http.post<IMessageStatus>(`${this.AccUrl}/signIn`, sign, {responseType: 'json'})
  }

  upDate(date: ISignin): Observable<IMessageStatus> {
    const headers = this.getAuthHeaders();
    return this.http.put<IMessageStatus>(`${this.AccUrl}/upDate`, date, {headers: headers, responseType: 'json'})
  }

  changePassword(pass: IPassword): Observable<IMessageStatus> {
    const headers = this.getAuthHeaders();
    return this.http.put<IMessageStatus>(`${this.AccUrl}/changePass`, pass, {headers: headers, responseType: 'json'})
  }

  getRole(): Observable<IMessageRole> {
    const headers = this.getAuthHeaders();
    return this.http.get<IMessageRole>(`${this.AccUrl}/role`, {headers: headers, responseType: 'json'})
  }

  getId(id: number | undefined): Observable<IAccount> {
    const headers = this.getAuthHeaders();
    return this.http.get<IAccount>(`${this.AccUrl}/${id}`, {headers: headers, responseType: 'json'})
  }


  all(params?: any): Observable<IPage<IAccount>>{
    const headers = this.getAuthHeaders();
    return this.http.get<IPage<IAccount>>(`${this.AccUrl}/all`, {headers:headers, responseType: 'json',
      params: new HttpParams({fromObject: params})})
  }

  deleteAcc(id: number | undefined): Observable<IMessageStatus> {
    const headers = this.getAuthHeaders();
    return this.http.delete<IMessageStatus>(`${this.AccUrl}/delete/${id}`, {headers: headers, responseType: "json" })
  }

  findAccName(name: string): Observable<string[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<string[]>(`${this.AccUrl}/findName/${name}`, {headers: headers, responseType: "json" })
  }

  isValidToken(): Observable<IMessageStatus>{
    const headers = this.getAuthHeaders();
    return this.http.get<IMessageStatus>(`${this.AccUrl}/validT`, {headers: headers, responseType: 'json'})
  }

  checkRole(): void {
    this.getRole().subscribe({
      next: res => {
        this.isAdmin.next(res.role === 'Admin')
      },
      error: err => {
        console.log(err);
      }
    })
  }
}
