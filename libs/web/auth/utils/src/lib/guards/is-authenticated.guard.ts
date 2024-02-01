import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

import { Store } from '@ngrx/store';

import { filter, take, tap } from 'rxjs';

import { AuthStore } from '@angular-auth/libs/web/auth/data-access/store';
import { RouterActions } from '@angular-auth/libs/web/shared/data-access/store';

export const isAuthenticatedGuard = (): CanActivateFn => () => {
  const authStore = inject(AuthStore);
  const store = inject(Store);

  return authStore.isAuthenticated$.pipe(
    tap((authenticated) => {
      if (!authenticated) {
        store.dispatch(RouterActions.go(['/login']));
      }
    }),
    filter((authenticated) => authenticated),
    take(1)
  );
};
