import { provideHttpClient } from '@angular/common/http';
import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { Store, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import {
  CustomSerializer,
  ROOT_EFFECTS,
  ROOT_REDUCERS,
  RouterFeatureKey,
} from '@angular-auth/libs/web/shared/data-access/store';
import { initApp, provideAppConfig } from '@angular-auth/libs/web/shared/utils';
import { webShellRoutes } from '@angular-auth/web/shell/feature';
import { environment } from '../environments';

const provideAppInitializer = () => ({
  provide: APP_INITIALIZER,
  useFactory: (store: Store) => () => store.dispatch(initApp()),
  multi: true,
  deps: [Store],
});

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
    provideAppInitializer(),
    provideHttpClient(),
    provideAppConfig(environment),
  ],
};
