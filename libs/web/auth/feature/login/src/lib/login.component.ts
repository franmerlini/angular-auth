import { ChangeDetectionStrategy, Component } from '@angular/core';

import { LoginFormComponent } from '@angular-auth/libs/web/auth/ui/login-form';

@Component({
  selector: 'aa-login',
  standalone: true,
  imports: [LoginFormComponent],
  template: `
    <div class="flex justify-center items-center">
      <aa-login-form />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {}
