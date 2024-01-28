import { OmitType, PartialType } from '@nestjs/swagger';

import { CountryDTO } from './country.dto';

export class UpdateCountryDTO extends PartialType(
  OmitType(CountryDTO, ['id'])
) {}
