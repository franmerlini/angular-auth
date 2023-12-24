import { inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, exhaustMap, map, of } from 'rxjs';

import { CountryService } from '@angular-auth/libs/web/shared/data-access/api';
import { CountryActions } from './country.actions';

const loadCountries$ = createEffect(
  (actions$ = inject(Actions), countryService = inject(CountryService)) =>
    actions$.pipe(
      ofType(CountryActions.loadCountries),
      exhaustMap(() =>
        countryService.getCountries().pipe(
          map((countries) =>
            CountryActions.loadCountriesSuccess({ countries })
          ),
          catchError(() =>
            of(
              CountryActions.loadCountriesFailure({
                error: 'Error al cargar los países.',
              })
            )
          )
        )
      )
    ),
  { functional: true }
);

export const CountryEffects = { loadCountries$ };
