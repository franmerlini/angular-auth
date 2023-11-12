import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { WebShellModule } from '@angular-auth/web/shell/feature';

@Component({
  standalone: true,
  imports: [BrowserModule, WebShellModule],
  selector: 'angular-auth-root',
  template: `<router-outlet />`,
})
export class AppComponent {}
