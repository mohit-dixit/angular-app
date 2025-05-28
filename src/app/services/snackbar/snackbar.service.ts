import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  public showSnackBar(context: string, message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
      panelClass: [context || 'default-snackbar'],
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }

  public showErrorMessage(message: string) {
    this.showSnackBar('red-error-snackbar', message);
  }

  public showSuccessMessage(message: string) {
    this.showSnackBar('green-success-snackbar', message);
  }

  public showWarningMessage(message: string) {
    this.showSnackBar('orange-warning-snackbar', message);
  }

  public showDefaultMessage(message: string) {
    this.showSnackBar('default-snackbar', message);
  }
}
