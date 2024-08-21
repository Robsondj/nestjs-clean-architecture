import { HttpStatus } from '@nestjs/common';

export class ResponseDto<T> {
  message: string;
  data: T;
  statusCode: HttpStatus;

  constructor(message: string, data: T, statusCode: HttpStatus) {
    this.message = message;
    this.data = data;
    this.statusCode = statusCode;
  }

  static successRequest<T>(data: T, message = 'Success'): ResponseDto<T> {
    return new ResponseDto<T>(message, data, HttpStatus.OK);
  }

  static serverError<T>(message: string): ResponseDto<T> {
    return new ResponseDto<T>(message, null, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  static badRequest<T>(message: string): ResponseDto<T> {
    return new ResponseDto<T>(message, null, HttpStatus.BAD_REQUEST);
  }

  static successUpdate<T>(
    data: T,
    message = 'Update successful',
  ): ResponseDto<T> {
    return new ResponseDto<T>(message, data, HttpStatus.NO_CONTENT);
  }

  static successDelete<T>(
    data: T,
    message = 'Deletion successful',
  ): ResponseDto<T> {
    return new ResponseDto<T>(message, data, HttpStatus.ACCEPTED);
  }

  static forbidden<T>(message: string): ResponseDto<T> {
    return new ResponseDto<T>(message, null, HttpStatus.FORBIDDEN);
  }

  static unauthorized<T>(message: string): ResponseDto<T> {
    return new ResponseDto<T>(message, null, HttpStatus.UNAUTHORIZED);
  }
}
