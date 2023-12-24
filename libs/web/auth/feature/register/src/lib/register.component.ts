import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Store } from '@ngrx/store';

import { CreateUserDTO } from '@angular-auth/libs/common';
import { AuthStore } from '@angular-auth/libs/web/auth/data-access/store';
import { RegisterFormComponent } from '@angular-auth/libs/web/auth/ui/register-form';
import { CountryFeature } from '@angular-auth/libs/web/shared/data-access/store';

@Component({
  selector: 'aa-register',
  standalone: true,
  imports: [RegisterFormComponent, RouterLink, AsyncPipe],
  template: `
    <div class="min-h-screen flex flex-col justify-center items-center">
      @if (countries$ | async; as countries) {
      <aa-register-form
        [countryList]="countries"
        (registerUser)="onRegisterUser($event)"
      />
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  private readonly authStore = inject(AuthStore);
  private readonly store = inject(Store);

  countries$ = this.store.select(CountryFeature.selectAll);

  onRegisterUser(user: CreateUserDTO): void {
    this.authStore.register(user);
  }
}
