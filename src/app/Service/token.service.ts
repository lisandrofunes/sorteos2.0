import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const TOKEN_KEY = 'AuthToken';
const EMAIL = 'userEmail';
const NAME = 'userName';
const PHOTOURL = 'photoUrl';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private isLoggedIn: boolean = false;

  constructor() { }

  setLoggedIn(value: boolean) {
    this.isLoggedIn = value;
  }
  getLoggedIn(): boolean{
    return this.isLoggedIn;
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public setToken(token: string): void {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.setItem(TOKEN_KEY, token);
  }

  public setEmail(email: string): void{
    sessionStorage.removeItem(EMAIL);
    sessionStorage.setItem(EMAIL, email);
  }

  public getEmail(): string {
    return sessionStorage.getItem(EMAIL);
  }

  public setName(name: string): void{
    sessionStorage.removeItem(NAME);
    sessionStorage.setItem(NAME, name);
  }

  public getName(): string {
    return sessionStorage.getItem(NAME);
  }

  public setPhotoUrl(photoUrl: string): void{
    sessionStorage.removeItem(PHOTOURL);
    sessionStorage.setItem(PHOTOURL, photoUrl);
  }

  public getPhotoUrl(): string {
    return sessionStorage.getItem(PHOTOURL);
  }

  logOut(): void {
    sessionStorage.clear();
  }
}