import { Component } from '@angular/core';
import { Route, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DepartmentComponent } from './components/department/department.component';
import { CommonModule } from '@angular/common';
import { SnackbarService } from './services/snackbar/snackbar.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  preserveWhitespaces: true,
})
export class AppComponent {
  title = 'my-app';

  constructor(private router: Router, 
      private _snackbar: SnackbarService){}

  logOut(){
    sessionStorage.setItem('isLoggedIn', 'false');
    this._snackbar.showSuccessMessage("You have been logged out successfully.");
    this.router.navigate(['login']);
  }

  isLoggedIn(){
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    return isLoggedIn === 'true';
  }  
}
