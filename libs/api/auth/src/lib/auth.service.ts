import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { compare } from 'bcrypt';

import { UserService } from '@angular-auth/libs/api/user';
import { AuthCredentials, JwtPayload, User } from '@angular-auth/libs/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string): Promise<User | null> {
    return await this.userService.getUserByEmail(email);
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    return compare(password, user.password);
  }

  generateCredentials(user: Express.User): Promise<AuthCredentials> {
    const { id, email, role } = user;

    const jwtPayload: JwtPayload = {
      sub: id,
      email,
      role,
    };

    return this.generateTokens(jwtPayload);
  }

  private async generateTokens(
    jwtPayload: JwtPayload
  ): Promise<AuthCredentials> {
    return {
      userId: jwtPayload.sub,
      accessToken: this.jwtService.sign(jwtPayload, { expiresIn: '30m' }),
      refreshToken: this.jwtService.sign(jwtPayload, { expiresIn: '1d' }),
    };
  }
}
