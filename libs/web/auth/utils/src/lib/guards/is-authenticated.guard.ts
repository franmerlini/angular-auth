import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

import { Store } from '@ngrx/store';

import { map } from 'rxjs';

import { AuthStore } from '@angular-auth/libs/web/auth/data-access/store';
import { RouterActions } from '@angular-auth/libs/web/shared/data-access/store';

export const isAuthenticated = (): CanActivateFn => () => {
  const authStore = inject(AuthStore);
  const store = inject(Store);

  return authStore.isAuthenticated$.pipe(
    map((isAuthenticated) => {
      if (!isAuthenticated) {
        store.dispatch(RouterActions.go(['/login']));
        return false;
      }
      return true;
    })
  );
};
