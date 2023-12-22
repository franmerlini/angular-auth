import { Route } from '@angular/router';

import { LoginComponent } from '@angular-auth/libs/web/auth/feature/login';
import { RegisterComponent } from '@angular-auth/libs/web/auth/feature/register';
import { LayoutComponent } from '@angular-auth/web/shell/ui/layout';

export const webShellRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
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
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
