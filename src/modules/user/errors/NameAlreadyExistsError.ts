import { ServiceError } from '@shared/core/errors/ServiceError';
import { statusCode } from '@shared/core/types/statusCode';

export class NameAlreadyExistsError extends Error implements ServiceError {
  statusCode: number = statusCode.CONFLICT;

  constructor() {
    super('Já existe um usuário com o mesmo nome');
  }
}
