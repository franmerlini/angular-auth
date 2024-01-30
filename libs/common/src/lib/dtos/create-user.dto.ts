import { IsEmail, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

import { CountryDTO } from './country.dto';

export class CreateUserDTO {
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
  country!: CountryDTO;

  @IsNotEmpty()
  @IsString()
  password!: string;
}
