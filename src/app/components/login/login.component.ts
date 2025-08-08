import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { HttpService } from '../../services/http/http.service';
import { environment } from '../../environments/environment';
import { filter, Subscription } from 'rxjs';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import { TimerService } from '../../services/timer/timer.service';
import { TokenManagerService } from '../../services/tokenmanager/token-manager.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  signUpForm!: FormGroup;
  loginForm!: FormGroup;
  private routerSubscription: Subscription;

  constructor(private router: Router,
    private _fb: FormBuilder,
    private _httpservice: HttpService,
    private _snackbar: SnackbarService,
    private _timerService: TimerService,
    private _tokenService: TokenManagerService) {

    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (event.urlAfterRedirects === '/login') {
        this.logOut();        
      }
    });
    
  }

  ngOnInit() {
    this.signUpForm = this._fb.group({
      username: ['',
        [Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20)]],
      email: ['',
        [Validators.required,
        Validators.email]],
      password: ['',
        [Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)]],
      confirmpassword: ['',
        [Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)]]
    });

    this.loginForm = this._fb.group({
      username: ['',
        [Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20)]],
      password: ['',
        [Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)]]
    });
  }

  signUp() {
    if (this.signUpForm.valid) {
      let api = environment.apis.signup;
      let saveobject = {
        username: this.signUpForm.value.username,
        email: this.signUpForm.value.email,
        password: this.signUpForm.value.password
      }
      this._httpservice.savedata(api, saveobject).subscribe((data: any) => {
        if (data) {
          if (data.success) {
            this.signUpForm.reset();
            this._snackbar.showSuccessMessage(data.message);
          }
          else {
            this._snackbar.showErrorMessage(data.message);
          }
        }
      }, error => {
        if (error && error.error && error.error.text) {
          this._snackbar.showErrorMessage(error.error.text);
        }
        else {
          this._snackbar.showErrorMessage("Error in creating User. Please check the logs.");
        }
      });
      this.router.navigate(['login']);
    } else {
      console.log('Form is invalid');
    }
  }

  login() {
    Object.keys(this.loginForm.controls).forEach(key => {
      this.loginForm.get(key)?.markAsTouched();
    });

    if (this.loginForm.valid
      && this.loginForm.value.username &&
      this.loginForm.value.password) {

      let loginobject = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      }

      let api = environment.apis.login;
      this._httpservice.login(api, loginobject).subscribe((data: any) => {
        if (data && data.success) {
          this._tokenService.setLoginUserName(data.username);
          this._snackbar.showSuccessMessage(data.message);
          this._timerService.resetTimer();
          this._timerService.startTimer();
          this.loginForm.reset();
          this.router.navigate(['home']);
        }
        else if (data && !data.success && data.message) {
          this._snackbar.showErrorMessage(data.message);
        }
      }, error => {
        this._snackbar.showErrorMessage("Error in retrieving data. Please check the logs.");
        console.log(error);
      });
    }
    else {
      this._tokenService.removeLoginUserName();
    }
  }

  logOut() {
    this._tokenService.removeLoginUserName();
    this._timerService.resetTimer();
    let api = environment.apis.signout;
    this._httpservice.logout(api).subscribe((data: any) => {      
      this._snackbar.showSuccessMessage("You have been logged out successfully.");
    }, error => {
      console.log("Error in saving data");
      console.log(error);
    });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
