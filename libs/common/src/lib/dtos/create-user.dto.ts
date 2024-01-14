import { OmitType } from '@nestjs/swagger';

import { IsNotEmpty, IsString } from 'class-validator';

import { UserDTO } from './user.dto';

export class CreateUserDTO extends OmitType(UserDTO, ['id', 'role', 'token']) {
  @IsNotEmpty()
  @IsString()
  password!: string;
}
