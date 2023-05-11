import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sorteo } from '../models/sorteo';
import { TokenDto } from '../models/token';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  url = 'http://localhost:8080/oauth/';

  constructor(private http: HttpClient) { }

  getSorteos(email: string): Observable<Sorteo[]> {
    return this.http.get<Sorteo[]>(this.url + `history/${email}`);
  }

}
