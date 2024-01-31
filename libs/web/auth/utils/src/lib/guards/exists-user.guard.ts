import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

import { filter, take, tap } from 'rxjs';

import { AuthStore } from '@angular-auth/libs/web/auth/data-access/store';

export const existsUserGuard = (): CanActivateFn => () => {
  const authStore = inject(AuthStore);

  return authStore.userLoaded$.pipe(
    tap((loaded) => {
      if (!loaded) {
        authStore.loadUser();
      }
    }),
    filter((loaded) => loaded),
    take(1)
  );
};
