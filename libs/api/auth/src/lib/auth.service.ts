import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { compare } from 'bcrypt';

import { UserService } from '@angular-auth/libs/api/user';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async login(
    email: string,
    password: string
  ): Promise<{ accessToken: string }> {
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const { password: userPassword, id, role } = user;

    const isValidPassword = await compare(password, userPassword);

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const accessToken = await this.jwtService.signAsync({
      sub: id,
      email,
      role,
    });

    return {
      accessToken,
    };
  }
}
