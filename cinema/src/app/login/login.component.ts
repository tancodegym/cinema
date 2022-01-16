import { Component, OnInit } from '@angular/core';
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser} from "angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: SocialUser = new SocialUser;

  constructor(private authService: SocialAuthService
  ) {

  }

  public signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  public signOut(): void {
    this.authService.signOut();
  }
  public signInWithFacebook(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  ngOnInit(): void {
    this.authService.authState.subscribe(user => {
      this.user = user;
      console.log(user);
    });
  }
}
