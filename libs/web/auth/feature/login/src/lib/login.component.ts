import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { AuthStore } from '@angular-auth/libs/web/auth/data-access/store';
import { LoginFormComponent } from '@angular-auth/libs/web/auth/ui/login-form';

@Component({
  selector: 'aa-login',
  standalone: true,
  imports: [LoginFormComponent],
  template: `
    <div class="min-h-screen flex justify-center items-center">
      <aa-login-form (submitForm)="onSubmitForm($event)" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly authStore = inject(AuthStore);

  onSubmitForm({ email, password }: { email: string; password: string }): void {
    this.authStore.login({ email, password });
  }
}
