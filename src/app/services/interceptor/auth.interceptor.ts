import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = sessionStorage.getItem('authToken'); // Or wherever your token is stored

  if (token) {
    const clonedReq = req.clone({
      withCredentials: true,
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedReq);
  } else {
    const clonedReq = req.clone({
      withCredentials: true,
    });
    return next(clonedReq);
  }
};