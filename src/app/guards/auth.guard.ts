import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar/snackbar.service';

export const authGuard: CanActivateFn = (route, state) => {
  
  const _router = inject(Router);
  const _snackbar = inject(SnackbarService);

  let isloggedIn = sessionStorage.getItem('isLoggedIn');
  if(isloggedIn === 'false' || isloggedIn === null){
    _snackbar.showErrorMessage("You are not logged in. Please log in to access this page.");
    _router.navigate(['login']);
  }
  return true;
};
