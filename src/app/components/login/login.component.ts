import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  signUpForm!: FormGroup;
  loginForm!: FormGroup;

  constructor(private router: Router, private _fb: FormBuilder, private service: HttpService) { } 

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

  signUp(){
    if (this.signUpForm.valid) {
      let api = environment.apis.signup;
      let saveobject = {
        username: this.signUpForm.value.username,
        email: this.signUpForm.value.email,
        password: this.signUpForm.value.password
      }
      this.service.savedata(api, saveobject).subscribe((data: any) => {
      this.signUpForm.reset();
      alert("User created successfully. Please login to continue.");
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

    if (this.loginForm.valid && this.loginForm.value.username && this.loginForm.value.password) {

      sessionStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['home']);

      //   let api = environment.apis.login;
      //   this.service.getalldata(api).subscribe((data: any) => {
      //   if (data && data.length > 0) {

      //   }
      //   else {
      //     alert("User not found. Please sign up.");
      //   }
      // }, error => {
      //   console.log("Error in retrieving data");
      //   console.log(error);
      // });
    }
    else {
      sessionStorage.setItem('isLoggedIn', 'false');
    }
  }

  cancel(){
    
  }

}
