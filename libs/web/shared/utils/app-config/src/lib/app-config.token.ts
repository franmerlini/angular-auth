import { InjectionToken, ValueProvider } from '@angular/core';

export interface AppConfig {
  production: boolean;
  baseURL: string;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('angular-auth.config');

export const provideAppConfig = (value: AppConfig): ValueProvider => ({
  provide: APP_CONFIG,
  useValue: value,
});
