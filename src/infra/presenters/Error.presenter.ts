import {
  BadRequestException,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ServiceError } from '@shared/core/errors/ServiceError';
import { statusCode } from '@shared/core/types/statusCode';

/**
 *
 * @class ErrorPresenter - Present all possible application errors
 */
export class ErrorPresenter {
  private static errorMap: { [key: number]: any } = {
    [statusCode.NOT_FOUND]: NotFoundException,
    [statusCode.INTERNAL_SERVER_ERROR]: InternalServerErrorException,
    [statusCode.BAD_REQUEST]: BadRequestException,
    [statusCode.FORBIDDEN]: ForbiddenException,
  };

  static toHTTP(error: ServiceError) {
    const Exception =
      this.errorMap[error.statusCode] || InternalServerErrorException;
    throw new Exception(error.message);
  }
}
