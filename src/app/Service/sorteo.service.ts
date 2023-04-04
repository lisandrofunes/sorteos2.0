import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Sorteo } from '../models/sorteo';

@Injectable({
  providedIn: 'root'
})
export class SorteoService {

  url = 'http://localhost:8080/'

  constructor(private http: HttpClient) { }

  getSorteos() {
    return this.http.get<Sorteo[]>(this.url + 'lista');
  }

  sortear(participantes: FormData): Observable<any> {
    return this.http.post<any>(this.url + 'create', participantes);
  }

  eliminar(id:number):Observable<any>{
    return this.http.delete<any>(this.url+`delete/${id}`);
  }

}
