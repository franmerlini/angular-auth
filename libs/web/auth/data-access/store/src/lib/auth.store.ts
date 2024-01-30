import { Injectable, inject } from '@angular/core';

import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';

import { Observable, catchError, of, switchMap, tap } from 'rxjs';

import { CreateUserDTO, User } from '@angular-auth/libs/common';
import {
  AuthService,
  UserService,
} from '@angular-auth/libs/web/shared/data-access/api';
import { LocalStorageService } from '@angular-auth/libs/web/shared/data-access/local-storage';
import { RouterActions } from '@angular-auth/libs/web/shared/data-access/store';

import { AuthKeysEnum } from './auth-keys.enum';

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isRefreshing: boolean;
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
  private readonly userService = inject(UserService);

  readonly user$ = this.select((state) => state.user);
  readonly accessToken$ = this.select((state) => state.accessToken);
  readonly refreshToken$ = this.select((state) => state.refreshToken);
  readonly isAuthenticated$ = this.select((state) => state.isAuthenticated);
  readonly isRefreshing$ = this.select((state) => state.isRefreshing);
  readonly error$ = this.select((state) => state.error);

  private loadToken(): void {
    const accessToken = LocalStorageService.getItem(
      AuthKeysEnum.ACCESS_TOKEN_KEY
    );

    if (!accessToken) {
      this.patchState({ isAuthenticated: false });
      return;
    }

    this.patchState({ accessToken, isAuthenticated: true });
  }

  readonly login = this.effect(
    (credentials$: Observable<{ email: string; password: string }>) =>
      credentials$.pipe(
        switchMap(({ email, password }) =>
          this.authService.login(email, password).pipe(
            tap(({ accessToken, refreshToken }) => {
              this.patchState({
                accessToken,
                refreshToken,
                isAuthenticated: true,
              });
              LocalStorageService.setItem(
                AuthKeysEnum.ACCESS_TOKEN_KEY,
                accessToken
              );
              LocalStorageService.setItem(
                AuthKeysEnum.REFRESH_TOKEN_KEY,
                refreshToken
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
        this.userService.createUser(user).pipe(
          tap(() => this.store.dispatch(RouterActions.go(['/login']))),
          catchError((error) => of(this.patchState({ error })))
        )
      )
    )
  );

  readonly logout = this.effect((_: Observable<void>) =>
    _.pipe(
      tap(() => {
        this.patchState({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        });
        LocalStorageService.removeItem(AuthKeysEnum.ACCESS_TOKEN_KEY);
        LocalStorageService.removeItem(AuthKeysEnum.REFRESH_TOKEN_KEY);
        this.store.dispatch(RouterActions.go(['/login']));
      })
    )
  );

  set isRefreshing(isRefreshing: boolean) {
    this.patchState({ isRefreshing });
  }

  set accessToken(accessToken: string) {
    this.patchState({ accessToken });
  }

  set refreshToken(refreshToken: string) {
    this.patchState({ refreshToken });
  }
}
