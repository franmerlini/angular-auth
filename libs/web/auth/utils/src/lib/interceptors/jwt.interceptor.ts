import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';

import { Store } from '@ngrx/store';

import { EMPTY } from 'rxjs';

import { AuthUrlsEnum } from '@angular-auth/libs/common';
import { AuthStore } from '@angular-auth/libs/web/auth/data-access/store';
import { RouterActions } from '@angular-auth/libs/web/shared/data-access/store';

export const jwtInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const authStore = inject(AuthStore);
  const store = inject(Store);

  if (req.url.endsWith(AuthUrlsEnum.LOGIN)) {
    return next(req);
  }

  if (authStore.isRefreshing) {
    console.log('isRefreshing');
    return EMPTY;
  }

  if (req.url.endsWith(AuthUrlsEnum.REFRESH_TOKEN)) {
    req = authStore.addTokenToRequest(req);
    return next(req);
  }

  if (!authStore.accessToken) {
    store.dispatch(RouterActions.go(['/']));
    return EMPTY;
  }

  req = authStore.addTokenToRequest(req);
  return next(req);
};
