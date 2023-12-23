import { inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { tap } from 'rxjs';

import { AuthStore } from '@angular-auth/libs/web/auth/data-access/store';
import { initApp } from './app-init.actions';

export const initApp$ = createEffect(
  (actions$ = inject(Actions), authStore = inject(AuthStore)) =>
    actions$.pipe(
      ofType(initApp),
      tap(() => authStore.init())
    ),
  { functional: true, dispatch: false }
);
