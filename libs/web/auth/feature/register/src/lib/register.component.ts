import { ChangeDetectionStrategy, Component } from '@angular/core';

import { RegisterFormComponent } from '@angular-auth/libs/web/auth/ui/register-form';

@Component({
  selector: 'aa-register',
  standalone: true,
  imports: [RegisterFormComponent],
  template: `
    <div class="flex justify-center items-center">
      <aa-register-form />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {}
