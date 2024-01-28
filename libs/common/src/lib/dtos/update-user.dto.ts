import { OmitType, PartialType } from '@nestjs/swagger';

import { IsOptional, IsString } from 'class-validator';
import { UserDTO } from './user.dto';

export class UpdateUserDTO extends PartialType(OmitType(UserDTO, ['id'])) {
  @IsOptional()
  @IsString()
  password!: string;
}
