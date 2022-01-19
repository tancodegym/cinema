import { Component, OnInit } from '@angular/core';
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser} from "angularx-social-login";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {LoginRemember} from "../model/login-remember";
import {TokenStorageService} from "../service/token-storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {ToastrService} from "ngx-toastr";
import {AuthJWTService} from "../service/auth.service";
import {RecoverServiceService} from "../service/recover-service.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: SocialUser = new SocialUser;
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    remember: new FormControl(false)
  });
  username: string;
  successMessage = '';
  roles: string[] = [];
  returnUrl: string;
  loginRemember: LoginRemember;
  forgotEmail: string;
  constructor(
    private socialAuthService: SocialAuthService,
    private formBuilder: FormBuilder,
    private authService: AuthJWTService,
    private tokenStorageService: TokenStorageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private cookieService: CookieService,
    private recoverService: RecoverServiceService
  ) {
    if (cookieService.get('remember') === 'Yes') {
      this.loginForm.value.username = this.cookieService.get('username');
      this.loginForm.value.password = this.cookieService.get('password');
      this.loginRemember = this.loginForm.value;

    }
  }
  public signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  public signOut(): void {
    this.socialAuthService.signOut();
  }
  public signInWithFacebook(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  ngOnInit(): void {
    this.socialAuthService.authState.subscribe(user => {
      this.user = user;
      console.log(user);
    });
    this.loginForm.setValue(this.loginRemember);
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
    if (this.tokenStorageService.getToken()) {
      const user = this.tokenStorageService.getUser();
      this.authService.isLoggedIn = true;
      this.roles = this.tokenStorageService.getUser().roles;
      this.username = this.tokenStorageService.getUser().username;
    }
  }
  onSubmit(): void {
    this.authService.login(this.loginForm.value).subscribe(value => {
      if (this.loginForm.value.remember) {
        this.cookieService.set('remember', 'Yes', 365);
        this.cookieService.set('username', this.loginForm.value.username, 365);
        this.cookieService.set('password', this.loginForm.value.password, 365);
        this.tokenStorageService.saveTokenLocal(value.token);
        this.tokenStorageService.saveUserLocal(value);
      } else {
        this.cookieService.set('remember', 'No');
        this.cookieService.set('username', '');
        this.cookieService.set('password', '');
        this.tokenStorageService.saveTokenSession(value.token);
        this.tokenStorageService.saveUserSession(value);
      }
      this.authService.isLoggedIn = true;
      this.roles = this.tokenStorageService.getUser().roles;
      this.username = this.tokenStorageService.getUser().username;
      // if (this.returnUrl) {
      //   this.router.navigateByUrl(this.returnUrl);
      // } else {
      //   this.router.navigateByUrl('/system');
      // }
      this.router.navigateByUrl('/home')
      this.toastrService.success('Đăng nhập thành công.', 'Tin nhắn từ hệ thống');
    }, error => {
      this.toastrService.error('Đăng nhập thất bại.', 'Tin nhắn từ hệ thống');
      this.authService.isLoggedIn = false;
    });
  }

  getPassword() {
    this.recoverService.getPassword(this.forgotEmail).subscribe(
      next =>{
        this.toastrService.success('Password đã được gửi về email ' +
          'của bạn, vui lòng kiểm tra lại.','Tin nhắn từ hệ thống');
      },
      error =>{
        this.toastrService.error('Email không tồn tại, vui lòng nhập lại.', 'Tin nhắn từ hệ thống');
      }
    );
  }
}
