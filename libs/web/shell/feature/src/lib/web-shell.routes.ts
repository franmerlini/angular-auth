import { Route } from '@angular/router';

import { LoginComponent } from '@angular-auth/web/auth/ui/login';
import { RegisterComponent } from '@angular-auth/web/auth/ui/register';
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
