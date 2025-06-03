import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatSidenav, MatSidenavContainer } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import { DeviceDetectorService } from '../../services/devicedetector/device-detector.service';

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

  constructor(private router: Router,
    private _snackbar: SnackbarService, private _devicedetector: DeviceDetectorService) { }

  logOut() {
    this.hamburgerClick();
    sessionStorage.setItem('isLoggedIn', 'false');
    this._snackbar.showSuccessMessage("You have been logged out successfully.");
    this.router.navigate(['login']);
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
}
