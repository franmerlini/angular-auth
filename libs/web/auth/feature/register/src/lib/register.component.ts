import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { RegisterFormComponent } from '@angular-auth/libs/web/auth/ui/register-form';

@Component({
  selector: 'aa-register',
  standalone: true,
  imports: [RegisterFormComponent, RouterLink],
  template: `
    <div class="min-h-screen flex flex-col justify-center items-center">
      <aa-register-form />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {}
