import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { BaseException } from '@/modules/shared/domain/exceptions/base.exception';
import { ApiResponse } from '@/modules/shared/domain/response/api.response';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof BaseException) {
      status = exception.statusCode;
      message = exception.message;
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    }

    const errorResponse = ApiResponse.error({
      message: message,
      stack:
        process.env.NODE_ENV === 'development' ? exception.stack : undefined,
      statusCode: status,
    });

    response.status(status).json(errorResponse);
  }
}
