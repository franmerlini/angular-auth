import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import {
  CustomSerializer,
  ROOT_EFFECTS,
  ROOT_REDUCERS,
  RouterFeatureKey,
} from '@angular-auth/libs/web/shared/store';
import { webShellRoutes } from '@angular-auth/web/shell/feature';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(ROOT_REDUCERS),
    provideEffects(ROOT_EFFECTS),
    provideRouterStore({
      stateKey: RouterFeatureKey,
      serializer: CustomSerializer,
    }),
    provideStoreDevtools(),
    provideRouter(webShellRoutes),
  ],
};
