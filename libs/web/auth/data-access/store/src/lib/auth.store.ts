import { Injectable, inject } from '@angular/core';

import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';

import { Observable, catchError, map, of, switchMap } from 'rxjs';

import { CreateUserDTO, User } from '@angular-auth/libs/common';
import { AuthService } from '@angular-auth/libs/web/shared/data-access/api';
import { RouterActions } from '@angular-auth/libs/web/shared/data-access/store';

export interface AuthState {
  user: User;
  error: string;
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
  readonly error$ = this.select((state) => state.error);

  readonly login = this.effect(
    (credentials$: Observable<{ email: string; password: string }>) =>
      credentials$.pipe(
        switchMap(({ email, password }) =>
          this.authService.login(email, password).pipe(
            map((user) => {
              this.patchState({ user });
              return this.store.dispatch(RouterActions.go(['/']));
            }),
            catchError((error) => of(this.patchState({ error })))
          )
        )
      )
  );

  readonly register = this.effect((credentials$: Observable<CreateUserDTO>) =>
    credentials$.pipe(
      switchMap((user) =>
        this.authService.register(user).pipe(
          map((user) => {
            this.patchState({ user });
            return this.store.dispatch(RouterActions.go(['/']));
          }),
          catchError((error) => of(this.patchState({ error })))
        )
      )
    )
  );
}
