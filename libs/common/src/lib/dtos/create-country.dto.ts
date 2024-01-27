import { OmitType } from '@nestjs/swagger';

import { CountryDTO } from './country.dto';

export class CreateCountryDTO extends OmitType(CountryDTO, ['id']) {}
