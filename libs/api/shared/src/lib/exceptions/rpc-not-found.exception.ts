import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export class RpcNotFoundException extends RpcException {
  constructor(message: string) {
    super({
      status: HttpStatus.NOT_FOUND,
      message,
    });
  }
}
