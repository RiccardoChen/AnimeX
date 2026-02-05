import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {IProfile} from "../../interfaces/IProfile";
import {IAccPro} from "../../interfaces/IAccPro";
import {IMessage, IMessageStatus} from "../../interfaces/IMessage";

@Injectable({
  providedIn: 'root'
})
export class ProfileRequestService {

  private readonly ProfileUrl: string = "http://localhost:8080/AnimeX/Profile";

  constructor(private http: HttpClient) { }

  getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': localStorage.getItem("token") || ""
    });
  }

  getAccountProfile(): Observable<IAccPro>{
    const headers = this.getAuthHeaders();
    return this.http.get<IAccPro>(`${this.ProfileUrl}/takeData`, { headers: headers, responseType: 'json'})
  }

  upDate(data: IProfile): Observable<IProfile>{
    const headers = this.getAuthHeaders();
    return this.http.put<IProfile>(`${this.ProfileUrl}/upDate`, data, { headers: headers, responseType: 'json'})
  }

  // isValidToken():Observable<IMessageStatus | IMessage>{
  //   const headers = this.getAuthHeaders();
  //   return this.http.get<IMessageStatus | IMessage>(`${this.ProfileUrl}/isValidToken`, { headers: headers, responseType: 'json'})
  // }
}
