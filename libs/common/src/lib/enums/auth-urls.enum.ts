import { AuthEndpointsEnum } from './auth-endpoints.enum';
import { ControllersEnum } from './controllers.enum';

export const AuthUrlsEnum = {
  LOGIN: `/${ControllersEnum.AUTH}/${AuthEndpointsEnum.LOGIN}`,
  REFRESH_TOKEN: `/${ControllersEnum.AUTH}/${AuthEndpointsEnum.REFRESH_TOKEN}`,
} as const;
