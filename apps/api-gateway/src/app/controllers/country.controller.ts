import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';

import { catchError, Observable } from 'rxjs';

import { MicroservicesEnum, Public, UserClientPatternsEnum } from '@angular-auth/libs/api/shared';
import { ControllersEnum, Country } from '@angular-auth/libs/shared';

@Controller(ControllersEnum.COUNTRY)
export class CountryController {
  constructor(@Inject(MicroservicesEnum.USER_SERVICE) private readonly userClient: ClientProxy) {}

  @Public()
  @Get()
  getCountries(): Observable<Country[]> {
    return this.userClient.send<Country[]>(UserClientPatternsEnum.GET_COUNTRIES, {}).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }
}
