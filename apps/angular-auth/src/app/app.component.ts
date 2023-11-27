import { Component } from '@angular/core';

import { WebShellModule } from '@angular-auth/web/shell/feature';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [WebShellModule, RouterModule],
  selector: 'angular-auth-root',
  template: `<router-outlet />`,
})
export class AppComponent {}
