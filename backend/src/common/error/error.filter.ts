import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { ZodError } from 'zod';

@Catch(ZodError, HttpException)
export class ErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    if (response instanceof HttpException) {
      response.status(exception.getStatus()).json({
        errors: response.getResponse(),
      });
    } else if (response instanceof ZodError) {
      response.status(403).json({
        errors: 'Validation error!',
      });
    } else {
      response.status(500).json({
        errors: exception.message,
      });
    }
  }
}
