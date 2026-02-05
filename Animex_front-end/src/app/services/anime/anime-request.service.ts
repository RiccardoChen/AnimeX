import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {IPage} from "../../interfaces/IPage";
import {IAnime, IAnimeCreate, IAnimeUpdate} from "../../interfaces/IAnime";
import {IMessage, IMessageStatus} from "../../interfaces/IMessage";

@Injectable({
  providedIn: 'root'
})
export class AnimeRequestService {

  private readonly AnimeUrl: string = "http://localhost:8080/AnimeX/Anime"

  constructor(private http: HttpClient) {
  }

  getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': localStorage.getItem("token") || ""
    });
  }

  getAllAnime(params?: any): Observable<IPage<IAnime>> {
    return this.http.get<IPage<IAnime>>(`${this.AnimeUrl}/all`, {
      params: new HttpParams({fromObject: params})
    });
  }

  getId(id: number): Observable<IAnime> {
    return this.http.get<IAnime>(`${this.AnimeUrl}/${id}`, { responseType: "json" });
  }
  animeRank(): Observable<IPage<IAnime>> {
    return this.http.get<IPage<IAnime>>(`${this.AnimeUrl}/rank`, { responseType: "json" })
  }

  create(anime: IAnimeCreate ): Observable<IAnime> {
    const headers = this.getAuthHeaders();
    return this.http.post<IAnime>(`${this.AnimeUrl}/create`, anime, {headers: headers, responseType: "json" })
  }

  getName(name: string): Observable<IAnime> {
    return this.http.get<IAnime>(`${this.AnimeUrl}/findName/${name}`, { responseType: "json" })
  }

  getNames(name: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.AnimeUrl}/findNames/${name}`, { responseType: "json" })
  }


  upDate(anime: IAnimeUpdate): Observable<IAnime> {
    const headers = this.getAuthHeaders();
    return this.http.put<IAnime>(`${this.AnimeUrl}/upDate`, anime, {headers: headers, responseType: "json" })
  }

  delete(id: number): Observable<IMessageStatus> {
    const headers = this.getAuthHeaders();
    return this.http.delete<IMessageStatus>(`${this.AnimeUrl}/delete/${id}`, {headers: headers, responseType: "json" })
  }




}
