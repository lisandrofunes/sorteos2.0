import { Component, OnInit } from '@angular/core';
import { GoogleInitOptions, GoogleLoginProvider, SocialAuthService } from "@abacritt/angularx-social-login";
import { SocialUser } from "@abacritt/angularx-social-login";
import { Router } from '@angular/router';
import { TokenService } from '../Service/token.service';
import { OauthService } from '../Service/oauth.service';
import { TokenDto } from '../models/token';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent{

  userLogged: SocialUser;
  isLogged: boolean;
  tokenGoogle: TokenDto;

  constructor(
    private authService: SocialAuthService,
    private router: Router,
    private oauthService: OauthService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.authService.authState.subscribe(
      data => {
        this.userLogged = data;
        this.isLogged = (this.userLogged != null && this.tokenService.getToken() != null);
        console.log('islogged: '+this.isLogged);
      
        
        this.tokenGoogle = new TokenDto(this.userLogged.idToken);

        const email = this.userLogged.email;
        const name = this.userLogged.firstName;
        const photoUrl = this.userLogged.photoUrl;
        this.tokenService.setEmail(email);
        this.tokenService.setName(name);
        this.tokenService.setPhotoUrl(photoUrl);
        
        
        this.oauthService.google(this.tokenGoogle).subscribe(
          res => {
            this.tokenService.setToken(res.value);
            this.isLogged = true;
            this.tokenService.setLoggedIn(this.isLogged);
            console.log(this.tokenService.getLoggedIn());
            

            this.router.navigate(['/']);
          },
          err => {
            console.log(err);
            // this.logOut();
          }
        );
      }
    )
  }

  getToken(){
    return this.tokenGoogle;
  }

  // signInWithGoogle(): void {
  //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(x => console.log(x));
  // }

  // signInWithGoogle(): void {
  //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
  //     data => {
  //       this.socialUser = data;
  //       const tokenGoogle = new TokenDto(this.socialUser.idToken);
  //       this.oauthService.google(tokenGoogle).subscribe(
  //         res => {
  //           this.tokenService.setToken(res.value);
  //           this.isLogged = true;
  //           this.router.navigate(['/']);
  //         },
  //         err => {
  //           console.log(err);
  //           this.logOut();
  //         }
  //       );
  //     }
  //   ).catch(
  //     err => {
  //       console.log(err);
  //     }
  //   );
  // }


}
