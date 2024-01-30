import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { inject } from '@angular/core';

import { Store } from '@ngrx/store';

import { EMPTY, catchError, concatMap, finalize, throwError } from 'rxjs';

import { AuthStore } from '@angular-auth/libs/web/auth/data-access/store';
import { AuthService } from '@angular-auth/libs/web/shared/data-access/api';
import { RouterActions } from '@angular-auth/libs/web/shared/data-access/store';

export const errorInterceptor = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const authStore = inject(AuthStore);
  const authService = inject(AuthService);
  const store = inject(Store);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status !== HttpStatusCode.Unauthorized) {
        return throwError(() => error);
      }

      authStore.isRefreshing = true;

      return authService.refreshToken().pipe(
        concatMap(({ accessToken, refreshToken }) => {
          authStore.accessToken = accessToken;
          authStore.refreshToken = refreshToken;

          req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          return next(req);
        }),
        catchError(() => {
          store.dispatch(RouterActions.go(['/']));
          return EMPTY;
        }),
        finalize(() => (authStore.isRefreshing = false))
      );
    })
  );
};
