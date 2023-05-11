import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenDto } from '../models/token';
import { Observable } from 'rxjs';

const cabecera = {headers: new HttpHeaders({'Content-Type' : 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class OauthService {

  
  oauthURL = 'http://localhost:8080/oauth/';

  constructor(private http: HttpClient) { }

  public google(tokenDto: TokenDto): Observable<TokenDto> {
    return this.http.post<TokenDto>(this.oauthURL + 'google', tokenDto);
  }

  public facebook(tokenDto: TokenDto): Observable<TokenDto> {
    return this.http.post<TokenDto>(this.oauthURL + 'facebook', tokenDto, cabecera);
  }

}