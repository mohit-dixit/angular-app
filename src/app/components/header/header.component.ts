import { Component } from '@angular/core';
import { TokenManagerService } from '../../services/tokenmanager/token-manager.service';
import { CommonService } from '../../services/common/common.service';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { Observable } from 'rxjs';
import { TimerService } from '../../services/timer/timer.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { ModalTitle, ModalTypes } from '../../constants/globalconst';
import { environment } from '../../environments/environment';
import { HttpService } from '../../services/http/http.service';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
@Component({
  selector: 'app-header',
  imports: [
    MatToolbar,
    MatIcon,
    CommonModule,
    RouterLink,
    MatRippleModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  time$!: Observable<number>;

  constructor(
    private _router: Router,
    private _service: HttpService,
    private _tokenService: TokenManagerService,
    private _commonService: CommonService,
    private _timerService: TimerService,
    private _dialog: MatDialog,
    private _snackbar: SnackbarService,
  ) {
    this.time$ = this._timerService.time$;
  }

  hamburgerClick() {
    this._commonService.hamburgerClick();
  }

  isLoggedIn() {
    return this._tokenService.isUserLoggedIn();
  }

  getLoginUserName() {
    return this._tokenService.getLoginUserName()?.toUpperCase();
  }

  hideOnMobile() {
    this._commonService.hideOnMobileClick();
  }

  logOut() {
    this._commonService.logOutClick();
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
