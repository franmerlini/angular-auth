import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export class RpcUnauthorizedException extends RpcException {
  constructor(message: string) {
    super({
      status: HttpStatus.UNAUTHORIZED,
      message,
    });
  }
}
