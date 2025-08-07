import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TokenManagerService } from '../../services/tokenmanager/token-manager.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';
import { HttpService } from '../../services/http/http.service';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import { TimerService } from '../../services/timer/timer.service';

@Component({
  selector: 'app-modal',
  imports: [MatDialogModule, MatButtonModule, CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})

export class ModalComponent {
  message: string;
  toShowExtendButton: boolean = true;

  constructor(private _router: Router,
    private _dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _tokenService: TokenManagerService,
    private _httpservice: HttpService,
    private _snackbar: SnackbarService,
    private _timerService: TimerService,) {
    this.message = data.message;
    if (data.toShowExtendButton === false) {
      this.toShowExtendButton = data.toShowExtendButton;
    }
  }

  extendToken() {
    let api = environment.apis.extend;
    this._httpservice.login(api, null).subscribe((data: any) => {
      if (data && data.success) {
        this._tokenService.setLoginUserName(data.username);
        this._snackbar.showSuccessMessage("Session Extended Successfully");
        this._timerService.resetTimer();
        this._timerService.startTimer();
        this._dialog.closeAll();
      }
      else if (data && !data.success && data.message) {
        this._snackbar.showErrorMessage(data.message);
      }
    }, error => {
      this._snackbar.showErrorMessage("Error in retrieving data. Please check the logs.");
      console.log(error);
    });

  }

  closePopup() {
    this._dialog.closeAll();
  }
}
