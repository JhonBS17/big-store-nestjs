import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response } from 'express';
import { ResponseService } from "src/controller/dto/response-service.dto";
import { BusinessException } from './business-exceptions';


@Catch()
export class ExceptionManager implements ExceptionFilter {
  // ...
  catch(exception, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let result: ResponseService;

    if (exception instanceof BusinessException) {
      console.error('exception => ', exception);
      result = new ResponseService(false, exception.description, exception.code, exception.details);
    }
    else if (exception instanceof HttpException)
      result = new ResponseService(false, exception?.getResponse()['error'], exception.getStatus(), exception?.getResponse()['message']);
    else
      result = new ResponseService(false, exception.message || 'A server-side error occurred', HttpStatus.INTERNAL_SERVER_ERROR);

    console.error('exception result => ', result);

    response
      .status(result.status)
      .json(result);
  }
}