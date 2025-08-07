import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar/snackbar.service';
import { TokenManagerService } from '../services/tokenmanager/token-manager.service';

export const authGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router);
  const _snackbar = inject(SnackbarService);
  const _tokenService = inject(TokenManagerService);

  _tokenService.checkIfTokenexpired().subscribe((isExpired: boolean) => {
    if (isExpired) {
      _snackbar.showErrorMessage("You are not logged in. Please log in to access this page.");
      _router.navigate(['login']);
    }
  });

  return true;
};
