import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { HttpService } from '../../services/http/http.service';
import { environment } from '../../environments/environment';
import { filter, Subscription } from 'rxjs';
import { SnackbarService } from '../../services/snackbar/snackbar.service';

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
      private _snackbar: SnackbarService) { 
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (event.urlAfterRedirects === '/login') {
        sessionStorage.setItem('isLoggedIn', 'false');
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
        this.signUpForm.reset();
        this._snackbar.showSuccessMessage("User created successfully. Please login to continue.");
        console.log("Data saved successfully");
      }, error => {
        console.log("Error in saving data");
        console.log(error);
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
      && this.loginForm.value.username && this.loginForm.value.password) {

       let loginobject = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      }

      let api = environment.apis.login;
      this._httpservice.login(api, loginobject).subscribe((data: any) => {
        if (data) {
          sessionStorage.setItem('isLoggedIn', 'true');
          this._snackbar.showSuccessMessage("Login Successful");
          this.router.navigate(['home']);
        }
        else {
          this._snackbar.showErrorMessage("Invalid username or password");
        }
      }, error => {
        console.log("Error in retrieving data");
        console.log(error);
      });
    }
    else {
      sessionStorage.setItem('isLoggedIn', 'false');
    }
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
