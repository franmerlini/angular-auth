import { Route } from '@angular/router';

import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { LoginComponent } from '@angular-auth/libs/web/auth/feature/login';
import { RegisterComponent } from '@angular-auth/libs/web/auth/feature/register';
import {
  countriesGuard,
  isAuthenticated,
} from '@angular-auth/libs/web/auth/utils';
import { CountryService } from '@angular-auth/libs/web/shared/data-access/api';
import {
  CountryEffects,
  CountryFeature,
} from '@angular-auth/libs/web/shared/data-access/store';
import { LayoutComponent } from '@angular-auth/web/shell/ui/layout';

export const webShellRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [isAuthenticated()],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@angular-auth/web/home/feature').then((m) => m.HomeModule),
      },
    ],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [countriesGuard()],
    providers: [
      provideState(CountryFeature),
      provideEffects(CountryEffects),
      CountryService,
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
