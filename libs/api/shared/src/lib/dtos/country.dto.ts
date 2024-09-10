import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CountryDto {
  @IsNotEmpty()
  @IsNumber()
  id!: number;

  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  code!: string;
}
