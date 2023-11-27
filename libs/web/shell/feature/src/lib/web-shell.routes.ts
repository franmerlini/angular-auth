import { LayoutComponent } from '@angular-auth/web/shell/ui/layout';
import { Route } from '@angular/router';

export const webShellRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
