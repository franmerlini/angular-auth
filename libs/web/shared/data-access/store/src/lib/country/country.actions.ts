import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Country } from '@angular-auth/libs/shared';

export const CountryActions = createActionGroup({
  source: 'Country/API',
  events: {
    'Load Countries': emptyProps(),
    'Load Countries Success': props<{ countries: Country[] }>(),
    'Load Countries Failure': props<{ error: string }>(),
  },
});
