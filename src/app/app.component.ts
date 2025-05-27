import { Component } from '@angular/core';
import { Route, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DepartmentComponent } from './components/department/department.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  preserveWhitespaces: true,
})
export class AppComponent {
  title = 'my-app';

  constructor(private router: Router){}

  logOut(){
    sessionStorage.setItem('isLoggedIn', 'false');
    alert('You have been logged out.');
    this.router.navigate(['login']);
  }

  isLoggedIn(){
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    return isLoggedIn === 'true';
  }  
}
