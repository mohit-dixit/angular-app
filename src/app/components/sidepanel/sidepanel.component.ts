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
import { TokenManagerService } from '../../services/tokenmanager/token-manager.service';
import { AppConfigService } from '../../services/app-config.service';

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
  private context: any;

  constructor(private _router: Router,
    private _snackbar: SnackbarService,
    private _devicedetector: DeviceDetectorService,
    private _service: HttpService,
    private _timerService: TimerService,
    private _dialog: MatDialog,
    private _tokenService: TokenManagerService,
    private _configService: AppConfigService
  ) {
    this.time$ = this._timerService.time$;
    this.context = this._configService.getConfig().context;
  }

  logOut() {
    this.hamburgerClick();
    let api = environment.apis.signout;
    this._service.logout(api).subscribe((data: any) => {
      this._snackbar.showSuccessMessage("You have been logged out successfully.");
      this._router.navigate(['login']);
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

  isLoggedIn() {
    return this._tokenService.isUserLoggedIn();
  }

  hideOnMobile() {
    const isMobile = this._devicedetector.isMobile();
    if (isMobile) {
      this.hamburgerClick();
    }
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins === 0 && secs === 1) {
      this._dialog.closeAll();
      const msg = "Your session has expired. Please log in again.";
      this.openSessionExpiredDialog(msg, false);
      this._router.navigate(['login']);
    }
    else if (this._dialog.openDialogs.length === 0) {
      if (mins === 0 && secs === 59) {
        const msg = "Your session is going to Expire. Do you want to extend it?";
        this.openSessionExpiredDialog(msg, true);
      }
    }
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  openSessionExpiredDialog(msg: string, toShowExtendButton: boolean): void {
    this._dialog.open(ModalComponent, {
      width: '750px',
      closeOnNavigation: true,
      disableClose: true,
      data: {
        message: msg,
        toShowExtendButton: toShowExtendButton
      }
    });
  }

  swagger() {
    window.open(this.context + environment.apis.swagger, '_blank');
  }
}
