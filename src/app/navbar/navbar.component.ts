import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { OauthService } from '../Service/oauth.service';
import { TokenService } from '../Service/token.service';

const LOGGED = 'isLogged';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  name: string;
  photoUrl: string;
  userLogged: SocialUser;
  isLogged: boolean;



  constructor(
    private authService: SocialAuthService,
    private router: Router,
    private oauthService: OauthService,
    private tokenService: TokenService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    
    if (sessionStorage.getItem(LOGGED) === 'true') {
      this.isLogged = true;
      this.name = this.tokenService.getName();
      this.photoUrl = this.tokenService.getPhotoUrl()
    } else {
      this.authService.authState.subscribe(
        data => {
          this.userLogged = data;
          this.isLogged = true;
          this.name = this.userLogged.firstName;
          this.photoUrl = this.userLogged.photoUrl;
          sessionStorage.setItem(LOGGED, 'true');
        }
      );
    }

  }


  checkSession() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.name = "true"
    } else {
      this.isLogged = false;
      this.name = 'false'
    }
  }

  logOut(): void{
    this.tokenService.logOut();

    window.location.reload();
    this.router.navigate(['/']);
  }

  // logOut(): void {
  //   this.authService.signOut().then(
  //     data => {
  //       this.tokenService.logOut();
  //       this.router.navigate(['/login']);
  //     }
  //   );
  // }
}
