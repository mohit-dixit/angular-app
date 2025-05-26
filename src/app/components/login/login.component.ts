import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private router: Router) { }

  login(username: string, password: string) {
    // Implement your login logic here
    if (username === 'admin' && password === 'admin') {
      sessionStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['home']);
    }
    else{
      sessionStorage.setItem('isLoggedIn', 'false');
    }
  }

  cancel(){
    
  }

}
