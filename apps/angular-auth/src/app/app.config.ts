import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { webShellRoutes } from '@angular-auth/web/shell/feature';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(webShellRoutes)],
};
