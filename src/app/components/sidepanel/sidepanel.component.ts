import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatSidenav, MatSidenavContainer } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import { DeviceDetectorService } from '../../services/devicedetector/device-detector.service';
import { environment } from '../../environments/environment';
import { HttpService } from '../../services/http/http.service';
import { TimerService } from '../../services/timer/timer.service';
import { Observable } from 'rxjs';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-sidepanel',
  imports: [MatNavList,
    MatSidenav,
    MatListItem,
    MatIcon,
    MatSidenavContainer,
    MatToolbar,
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive],
  templateUrl: './sidepanel.component.html',
  styleUrl: './sidepanel.component.scss'
})
export class SidepanelComponent {

  @ViewChild('sidenav') sidenav!: MatSidenav;
  showSubmenu: boolean = true;
  time$!: Observable<number>;

  constructor(private router: Router,
    private _snackbar: SnackbarService,
    private _devicedetector: DeviceDetectorService,
    private service: HttpService,
    private timerService: TimerService,
    private _dialog : MatDialog) {
    this.time$ = this.timerService.time$;
  }

  logOut() {
    this.hamburgerClick();
    let api = environment.apis.signout;
    this.service.logout(api).subscribe((data: any) => {
      sessionStorage.setItem('isLoggedIn', 'false');
      sessionStorage.removeItem('authToken');
      sessionStorage.removeItem('tokenExpiry');
      sessionStorage.removeItem('loginUsername');
      this._snackbar.showSuccessMessage("You have been logged out successfully.");
      this.router.navigate(['login']);
    }, error => {
      console.log("Error in saving data");
      console.log(error);
    });
  }

  hamburgerClick() {
    if (this.sidenav) {
      this.sidenav.toggle();
    }
  }  

  isLoggedIn(){  
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    return isLoggedIn === 'true';    
  }

  hideOnMobile() {
    const isMobile = this._devicedetector.isMobile();
    if(isMobile){
      this.hamburgerClick();
    }
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    console.log(`Time remaining: ${mins} minutes and ${secs} seconds`);
    if(mins === 0 && secs === 1 && this._dialog.openDialogs.length === 0) {
      this._dialog.open(ModalComponent, {
      width: '750px',
      closeOnNavigation: true,
      disableClose: true,
      data: {
        message: "Your session has expired. Please log in again."
      }      
    });
    this._snackbar.showErrorMessage("Your session has expired. Please log in again.");
    }
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }
}
