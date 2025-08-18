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
import { ModalTitle, ModalTypes } from '../../constants/globalconst';
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

  get isLoginPage(): boolean {
    return this._router.url === '/login';
  }

  logOut() {
    this.showLogOutModalPopup("Are you sure you want to log out?", false);
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
        toShowExtendButton: toShowExtendButton,
        modaltitle: ModalTitle.SESSION_EXIPRY,
        modaltype: ModalTypes.SESSION
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.extendToken();
      }
    });
  }

  showLogOutModalPopup(msg: string, toShowExtendButton: boolean): void {
    this._dialog.open(ModalComponent, {
      width: '750px',
      closeOnNavigation: true,
      disableClose: true,
      data: {
        message: msg,
        toShowExtendButton: toShowExtendButton,
        modaltitle: ModalTitle.CONFIRMATION,
        modaltype: ModalTypes.CONFIRM
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.onLogoutConfirm();
      }
    });
  }

  onLogoutConfirm() {
   this.hamburgerClick();
    let api = environment.apis.signout;
    this._router.navigate(['login']);
  }

  swagger() {
    window.open(this.context + environment.apis.swagger, '_blank');
  }

  extendToken() {
    let api = environment.apis.extend;
    this._service.login(api, null).subscribe((data: any) => {
      if (data && data.success) {
        this._tokenService.setLoginUserName(data.username);
        this._snackbar.showSuccessMessage("Session Extended Successfully");
        this._timerService.resetTimer();
        this._timerService.startTimer();
      }
      else if (data && !data.success && data.message) {
        this._snackbar.showErrorMessage(data.message);
      }
    }, error => {
      this._snackbar.showErrorMessage("Error in retrieving data. Please check the logs.");
      console.log(error);
    });
  }
}
