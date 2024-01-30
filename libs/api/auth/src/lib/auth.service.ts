import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { compare } from 'bcrypt';

import { Request } from 'express';

import { UserService } from '@angular-auth/libs/api/user';
import { AuthCredentials, JwtPayload } from '@angular-auth/libs/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async login(email: string, password: string): Promise<AuthCredentials> {
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const { password: userPassword, id, role } = user;

    const isValidPassword = await compare(password, userPassword);

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const jwtPayload: JwtPayload = {
      sub: id,
      email,
      role,
    };

    return this.generateTokens(jwtPayload);
  }

  async refreshToken(req: Request): Promise<AuthCredentials> {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('No token provided.');
    }

    const jwtPayload: JwtPayload = await this.jwtService.decode(token);

    if (!jwtPayload) {
      throw new UnauthorizedException('Invalid token.');
    }

    const user = await this.userService.getUserByEmail(jwtPayload.email);

    if (!user) {
      throw new ForbiddenException('Access denied.');
    }

    return this.generateTokens(jwtPayload);
  }

  private async generateTokens(
    jwtPayload: JwtPayload
  ): Promise<AuthCredentials> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, { expiresIn: '5s' }),
      this.jwtService.signAsync(jwtPayload, { expiresIn: '2m' }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
