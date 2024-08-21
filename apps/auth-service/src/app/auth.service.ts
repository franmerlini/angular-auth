import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';

import { compare } from 'bcrypt';

import { firstValueFrom } from 'rxjs';

import { AuthCredentials, JwtPayload, User } from '@angular-auth/libs/common';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
    private readonly jwtService: JwtService,
  ) {}

  validateUser(email: string): Promise<User | null> {
    return firstValueFrom(this.userServiceClient.send('get_user', email));
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

  private async generateTokens(jwtPayload: JwtPayload): Promise<AuthCredentials> {
    return {
      userId: jwtPayload.sub,
      accessToken: this.jwtService.sign(jwtPayload, { expiresIn: '30m' }),
      refreshToken: this.jwtService.sign(jwtPayload, { expiresIn: '1d' }),
    };
  }
}
