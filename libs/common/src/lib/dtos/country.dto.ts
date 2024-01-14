import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CountryDTO {
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
