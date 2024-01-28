import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';

import { Role, RoleEnum } from '../enums';
import { CountryDTO } from './country.dto';

export class UserDTO {
  @IsNotEmpty()
  @IsNumber()
  id!: number;

  @IsNotEmpty()
  @IsString()
  firstName!: string;

  @IsNotEmpty()
  @IsString()
  lastName!: string;

  @IsNotEmpty()
  @IsString()
  username!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  city!: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CountryDTO)
  country!: CountryDTO;

  @IsNotEmpty()
  @IsString()
  @IsEnum(RoleEnum)
  role!: Role;
}
