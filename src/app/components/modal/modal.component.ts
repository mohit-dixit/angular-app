import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})

export class ModalComponent { 
  message: string;

  constructor(private _router: Router,
    private _dialog: MatDialog,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.message = data.message;
  }

  closeDialogAndNavigateToLogin() {
    // Close the dialog and navigate to the login page
    this._dialog.closeAll();
    sessionStorage.setItem('isLoggedIn', 'false');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('tokenExpiry');
    sessionStorage.removeItem('loginUsername');
    // Navigate to the login page
    this._router.navigate(['login']);
  }
}
