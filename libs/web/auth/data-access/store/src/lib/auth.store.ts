import { Injectable, inject } from '@angular/core';

import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';

import { AuthService } from '@angular-auth/libs/web/shared/data-access/api';
import { User } from '@angular-auth/libs/web/shared/data-access/models';

export interface AuthState {
  user: User;
}

@Injectable({
  providedIn: 'root',
})
export class AuthStore extends ComponentStore<AuthState> {
  constructor() {
    super(<AuthState>{});
  }

  private readonly store = inject(Store);
  private readonly authService = inject(AuthService);

  readonly user$ = this.select((state) => state.user);
  readonly isAuthenticated$ = this.select((state) => !!state.user);
}
