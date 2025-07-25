import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar/snackbar.service';
import { TokenManagerService } from '../services/tokenmanager/token-manager.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../components/modal/modal.component';

export const authGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router);
  const _snackbar = inject(SnackbarService);
  const _tokenService = inject(TokenManagerService);
  const _dialog = inject(MatDialog);

  const isloggedIn = !_tokenService.isTokenExpired(); 

  if (isloggedIn === false || isloggedIn === null) {
    _snackbar.showErrorMessage("You are not logged in. Please log in to access this page.");

    _router.navigate(['login']);
    return false;
  }

  if (_tokenService.isTokenExpired()) {
    _dialog.open(ModalComponent, {
      width: '750px',
      closeOnNavigation: true,
      disableClose: true,
      data: {
        message: "Your session has expired. Please log in again."
      }      
    });
    _snackbar.showErrorMessage("Your session has expired. Please log in again.");

    return false;
  }

  return true;
};
