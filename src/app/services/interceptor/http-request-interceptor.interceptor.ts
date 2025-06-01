import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../loader/loading.service';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const httpRequestInterceptor: HttpInterceptorFn = (req, next) => {
  const loading = inject(LoadingService);
  loading.setLoading(true, req.url);
  return next(req).pipe(
    catchError((err) => {
      loading.setLoading(false, req.url);
      return throwError(() => err);
    }),
    map((evt: any) => {
      if (evt.type === 4) { // HttpEventType.Response
        loading.setLoading(false, req.url);
      }
      return evt;
    })
  );
};