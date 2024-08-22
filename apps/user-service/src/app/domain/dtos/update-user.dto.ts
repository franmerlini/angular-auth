import { IsEmail, IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';

import { Role, RoleEnum } from '@angular-auth/libs/shared';

import { CountryDTO } from './country.dto';

export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  firstName!: string;

  @IsOptional()
  @IsString()
  lastName!: string;

  @IsOptional()
  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  city!: string;

  @IsOptional()
  @ValidateNested()
  country!: CountryDTO;

  @IsOptional()
  @IsString()
  @IsEnum(RoleEnum)
  role!: Role;

  @IsOptional()
  @IsString()
  password!: string;

  @IsOptional()
  @IsString()
  picture!: string;
}
