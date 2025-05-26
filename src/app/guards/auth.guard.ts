import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  
  const _router = inject(Router);

  let isloggedIn = sessionStorage.getItem('isLoggedIn');
  if(isloggedIn === 'false' || isloggedIn === null){
    alert('You are not logged in. Please log in to access this page.');
    _router.navigate(['login']);
  }
  return true;
};
