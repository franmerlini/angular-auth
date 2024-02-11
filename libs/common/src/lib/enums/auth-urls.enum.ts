import { AuthEndpointsEnum } from './auth-endpoints.enum';
import { ControllersEnum } from './controllers.enum';

export const AuthUrlsEnum = {
  GOOGLE_LOGIN: `/${ControllersEnum.AUTH}/${AuthEndpointsEnum.GOOGLE_LOGIN}`,
  LOGIN: `/${ControllersEnum.AUTH}/${AuthEndpointsEnum.LOGIN}`,
  REFRESH_TOKEN: `/${ControllersEnum.AUTH}/${AuthEndpointsEnum.REFRESH_TOKEN}`,
} as const;
