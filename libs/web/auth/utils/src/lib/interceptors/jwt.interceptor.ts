import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';

import { Store } from '@ngrx/store';

import { EMPTY, forkJoin, switchMap } from 'rxjs';

import { AuthUrlsEnum } from '@angular-auth/libs/common';
import { AuthStore } from '@angular-auth/libs/web/auth/data-access/store';
import { RouterActions } from '@angular-auth/libs/web/shared/data-access/store';

const addTokenToRequest = (req: HttpRequest<unknown>, token: string) =>
  req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

export const jwtInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const authStore = inject(AuthStore);
  const store = inject(Store);

  return forkJoin([
    authStore.accessToken$,
    authStore.refreshToken$,
    authStore.isRefreshing$,
  ]).pipe(
    switchMap(([accessToken, refreshToken, isRefreshing]) => {
      if (req.url === AuthUrlsEnum.LOGIN) {
        return next(req);
      }

      if (req.url === AuthUrlsEnum.REFRESH_TOKEN && refreshToken) {
        req = addTokenToRequest(req, refreshToken);
        return next(req);
      }

      if (isRefreshing) {
        return EMPTY;
      }

      if (!accessToken) {
        store.dispatch(RouterActions.go(['/']));
        return EMPTY;
      }

      req = addTokenToRequest(req, accessToken);
      return next(req);
    })
  );
};
