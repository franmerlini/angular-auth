import { IsEmail, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

import { CountryDto } from './country.dto';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName!: string;

  @IsNotEmpty()
  @IsString()
  lastName!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  city!: string;

  @IsNotEmpty()
  @ValidateNested()
  country!: CountryDto;

  @IsNotEmpty()
  @IsString()
  password!: string;
}
