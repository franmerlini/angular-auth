import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

import { Store } from '@ngrx/store';

import { tap } from 'rxjs';

import { AuthStore } from '@angular-auth/libs/web/auth/data-access/store';
import { RouterActions } from '@angular-auth/libs/web/shared/store';

export const isAuthenticated = (): CanActivateFn => () => {
  const authStore = inject(AuthStore);
  const store = inject(Store);

  return authStore.isAuthenticated$.pipe(
    tap((isAuthenticated) => {
      if (!isAuthenticated) {
        store.dispatch(RouterActions.go(['/login']));
      }
    })
  );
};
