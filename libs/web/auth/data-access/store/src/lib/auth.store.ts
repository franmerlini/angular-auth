import { Injectable, inject } from '@angular/core';

import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';

import { EMPTY, Observable, catchError, of, switchMap, tap } from 'rxjs';

import { AuthCredentials, AuthUrlsEnum, CreateUserDTO, User } from '@angular-auth/libs/shared';
import { AuthService, UserService } from '@angular-auth/libs/web/shared/data-access/api';
import { LocalStorageService } from '@angular-auth/libs/web/shared/data-access/local-storage';
import { RouterActions } from '@angular-auth/libs/web/shared/data-access/store';

import { HttpRequest } from '@angular/common/http';
import { AuthKeysEnum } from './auth-keys.enum';

export interface AuthState {
  user: User | null;
  userId: number | null;
  userLoaded: boolean;
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
  private readonly userService = inject(UserService);
  private _isRefreshing = false;

  readonly user$ = this.select((state) => state.user);
  readonly userLoaded$ = this.select((state) => state.userLoaded);
  readonly isAuthenticated$ = this.select((state) => state.isAuthenticated);

  private loadToken(): void {
    const accessToken = LocalStorageService.getItem(AuthKeysEnum.ACCESS_TOKEN_KEY);
    this.patchState({ isAuthenticated: !!accessToken });
  }

  readonly googleAuth = this.effect((_: Observable<void>) => _.pipe(tap(() => this.authService.googleAuth())));

  readonly login = this.effect((credentials$: Observable<{ email: string; password: string }>) =>
    credentials$.pipe(
      switchMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          tap(({ userId, accessToken, refreshToken }) => this.setAuthState(userId, accessToken, refreshToken)),
          catchError((error) => of(this.patchState({ error }))),
        ),
      ),
    ),
  );

  readonly loginWithOAuth = this.effect((credentials$: Observable<AuthCredentials>) =>
    credentials$.pipe(
      tap(({ userId, accessToken, refreshToken }) => this.setAuthState(userId, accessToken, refreshToken)),
    ),
  );

  private setAuthState(userId: number, accessToken: string, refreshToken: string): void {
    this.patchState({
      userId,
      isAuthenticated: true,
    });

    LocalStorageService.setItem(AuthKeysEnum.USER_ID_KEY, userId.toString());
    LocalStorageService.setItem(AuthKeysEnum.ACCESS_TOKEN_KEY, accessToken);
    LocalStorageService.setItem(AuthKeysEnum.REFRESH_TOKEN_KEY, refreshToken);

    this.loadUser();
  }

  readonly register = this.effect((credentials$: Observable<CreateUserDTO>) =>
    credentials$.pipe(
      switchMap((user) =>
        this.userService.createUser(user).pipe(
          tap(() => this.store.dispatch(RouterActions.go(['/login']))),
          catchError((error) => of(this.patchState({ error }))),
        ),
      ),
    ),
  );

  readonly logout = this.effect((_: Observable<void>) =>
    _.pipe(
      tap(() => {
        this.patchState({
          user: null,
          userId: null,
          isAuthenticated: false,
        });
        LocalStorageService.removeItem(AuthKeysEnum.USER_ID_KEY);
        LocalStorageService.removeItem(AuthKeysEnum.ACCESS_TOKEN_KEY);
        LocalStorageService.removeItem(AuthKeysEnum.REFRESH_TOKEN_KEY);
        this.store.dispatch(RouterActions.go(['/login']));
      }),
    ),
  );

  readonly loadUser = this.effect((_: Observable<void>) =>
    _.pipe(
      switchMap(() => {
        if (!this.userId) {
          return EMPTY;
        }

        return this.userService.getUser(this.userId).pipe(
          tap((user) => {
            this.patchState({ user, userLoaded: true });
            this.store.dispatch(RouterActions.go(['/']));
          }),
          catchError((error) => of(this.patchState({ error, userLoaded: false }))),
        );
      }),
    ),
  );

  setTokens(accessToken: string, refreshToken: string) {
    LocalStorageService.setItem(AuthKeysEnum.ACCESS_TOKEN_KEY, accessToken);
    LocalStorageService.setItem(AuthKeysEnum.REFRESH_TOKEN_KEY, refreshToken);
  }

  addTokenToRequest(req: HttpRequest<unknown>) {
    const token = req.url.endsWith(AuthUrlsEnum.REFRESH_TOKEN) ? this.refreshToken : this.accessToken;
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  get isRefreshing(): boolean {
    return this._isRefreshing;
  }

  set isRefreshing(value: boolean) {
    this._isRefreshing = value;
  }

  get userId(): number | null {
    return Number(LocalStorageService.getItem(AuthKeysEnum.USER_ID_KEY));
  }

  get accessToken(): string | null {
    return LocalStorageService.getItem(AuthKeysEnum.ACCESS_TOKEN_KEY);
  }

  get refreshToken(): string | null {
    return LocalStorageService.getItem(AuthKeysEnum.REFRESH_TOKEN_KEY);
  }
}
