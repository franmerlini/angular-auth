import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCountryDTO {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  code!: string;
}
