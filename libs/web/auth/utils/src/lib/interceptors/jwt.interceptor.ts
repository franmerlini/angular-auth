import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';

import { Store } from '@ngrx/store';

import { EMPTY } from 'rxjs';

import { AuthUrlsEnum, ControllersEnum } from '@angular-auth/libs/common';
import { AuthStore } from '@angular-auth/libs/web/auth/data-access/store';
import { RouterActions } from '@angular-auth/libs/web/shared/data-access/store';

export const jwtInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authStore = inject(AuthStore);

  if (
    req.url.endsWith(AuthUrlsEnum.LOGIN) ||
    (req.url.endsWith(ControllersEnum.COUNTRY) && req.method === 'GET') ||
    (req.url.endsWith(ControllersEnum.USER) && req.method === 'POST')
  ) {
    return next(req);
  }

  if (req.url.endsWith(AuthUrlsEnum.REFRESH_TOKEN)) {
    req = authStore.addTokenToRequest(req);
    return next(req);
  }

  if (authStore.isRefreshing) {
    return EMPTY;
  }

  if (!authStore.accessToken) {
    inject(Store).dispatch(RouterActions.go(['/login']));
    return EMPTY;
  }

  req = authStore.addTokenToRequest(req);
  return next(req);
};
