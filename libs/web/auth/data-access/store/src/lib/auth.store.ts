import { Injectable, inject } from '@angular/core';

import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';

import { Observable, catchError, of, switchMap, tap } from 'rxjs';

import { CreateUserDTO, User } from '@angular-auth/libs/common';
import { AuthService } from '@angular-auth/libs/web/shared/data-access/api';
import { LocalStorageService } from '@angular-auth/libs/web/shared/data-access/local-storage';
import { RouterActions } from '@angular-auth/libs/web/shared/data-access/store';

import { AuthKeysEnum } from './auth-keys.enum';

export interface AuthState {
  user: User;
  accessToken: string;
  isAuthenticated: boolean;
  error: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthStore extends ComponentStore<AuthState> {
  constructor() {
    super(<AuthState>{});
    this.loadToken();
  }

  private readonly store = inject(Store);
  private readonly authService = inject(AuthService);

  readonly user$ = this.select((state) => state.user);
  readonly token$ = this.select((state) => state.accessToken);
  readonly isAuthenticated$ = this.select((state) => state.isAuthenticated);
  readonly error$ = this.select((state) => state.error);

  private loadToken(): void {
    const accessToken = LocalStorageService.getItem(
      AuthKeysEnum.ACCESS_TOKEN_KEY
    );

    if (!accessToken) {
      this.patchState({ isAuthenticated: false });
      return;
    }

    this.patchState({ accessToken });
    this.patchState({ isAuthenticated: true });
  }

  readonly login = this.effect(
    (credentials$: Observable<{ email: string; password: string }>) =>
      credentials$.pipe(
        switchMap(({ email, password }) =>
          this.authService.login(email, password).pipe(
            tap(({ accessToken }) => {
              this.patchState({ accessToken });
              this.patchState({ isAuthenticated: true });
              LocalStorageService.setItem(
                AuthKeysEnum.ACCESS_TOKEN_KEY,
                accessToken
              );
              this.store.dispatch(RouterActions.go(['/']));
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
          tap(() => this.store.dispatch(RouterActions.go(['/login']))),
          catchError((error) => of(this.patchState({ error })))
        )
      )
    )
  );
}
