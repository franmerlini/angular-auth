import { inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { initApp } from './app-init.actions';

export const initApp$ = createEffect(
  (actions$ = inject(Actions)) => actions$.pipe(ofType(initApp)),
  { functional: true, dispatch: false }
);
