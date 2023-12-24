import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable, catchError, filter, of, switchMap, take, tap } from 'rxjs';

import {
  CountryActions,
  CountryFeature,
} from '@angular-auth/libs/web/shared/data-access/store';

export const countriesGuard = (): CanActivateFn => () => {
  const store = inject(Store);

  return checkStore(store).pipe(
    switchMap(() => of(true)),
    catchError(() => of(false))
  );
};

const checkStore = (store: Store): Observable<boolean> => {
  return store.select(CountryFeature.selectLoaded).pipe(
    tap((loaded) => {
      if (!loaded) {
        store.dispatch(CountryActions.loadCountries());
      }
    }),
    filter((loaded) => loaded),
    take(1)
  );
};
