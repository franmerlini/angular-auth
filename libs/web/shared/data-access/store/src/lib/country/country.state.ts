import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';

import { Country } from '@angular-auth/libs/shared';
import { CountryActions } from './country.actions';

export const countryFeatureKey = 'country';

interface State extends EntityState<Country> {
  loading: boolean;
  loaded: boolean;
  error: string | null;
}

const adapter: EntityAdapter<Country> = createEntityAdapter<Country>();

const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false,
  error: null,
});

const reducer = createReducer(
  initialState,

  on(CountryActions.loadCountries, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(CountryActions.loadCountriesSuccess, (state, { countries }) =>
    adapter.setAll(countries, {
      ...state,
      loading: false,
      loaded: true,
      error: null,
    }),
  ),
  on(CountryActions.loadCountriesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error,
  })),
);

export const CountryFeature = createFeature({
  name: countryFeatureKey,
  reducer,
  extraSelectors: ({ selectCountryState }) => ({
    ...adapter.getSelectors(selectCountryState),
  }),
});
