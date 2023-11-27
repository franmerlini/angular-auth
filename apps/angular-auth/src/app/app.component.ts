import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'angular-auth-root',
  template: `<router-outlet />`,
})
export class AppComponent {}
