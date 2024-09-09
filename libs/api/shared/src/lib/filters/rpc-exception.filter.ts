import { ArgumentsHost, Catch, RpcExceptionFilter as NestRpcExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import { Request, Response } from 'express';

import { of } from 'rxjs';

@Catch(RpcException)
export class RpcExceptionFilter implements NestRpcExceptionFilter<RpcException> {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const { status, message } = exception.getError() as { status: number; message: string };

    return of(
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message,
      }),
    );
  }
}
