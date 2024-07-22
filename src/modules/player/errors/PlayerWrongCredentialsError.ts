import { ServiceError } from '@shared/core/errors/ServiceError';
import { statusCode } from '@shared/core/types/statusCode';

export class PlayerWrongCredentialsError extends Error implements ServiceError {
  statusCode: number = statusCode.UNAUTHORIZED;

  constructor() {
    super('Email ou senha inválidos');
  }
}
