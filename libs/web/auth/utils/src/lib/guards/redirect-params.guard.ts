import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

import { Store } from '@ngrx/store';

import { filter, map, of, take, tap } from 'rxjs';

import { RouterActions } from '@angular-auth/libs/web/shared/data-access/store';

export const redirectParamsGuard =
  (): CanActivateFn =>
  ({ queryParams }) => {
    const store = inject(Store);

    const hasAllParams = Boolean(
      queryParams['userId'] &&
        queryParams['accessToken'] &&
        queryParams['refreshToken']
    );

    return of(hasAllParams).pipe(
      tap((hasAllParams) => {
        if (!hasAllParams) {
          store.dispatch(RouterActions.go(['/']));
        }
      }),
      map((hasAllParams) => hasAllParams),
      filter((hasAllParams) => hasAllParams),
      take(1)
    );
  };
