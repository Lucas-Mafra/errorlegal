import { ServiceError } from '@shared/core/errors/ServiceError';
import { statusCode } from '@shared/core/types/statusCode';

export class NickNameAlreadyExistsError extends Error implements ServiceError {
  title: string = 'Já existe um player com o mesmo nickname';
  statusCode: number = statusCode.CONFLICT;

  constructor() {
    super('Nickname already exists');
  }
}
