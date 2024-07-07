import { ServiceError } from '@shared/core/errors/ServiceError';
import { statusCode } from '@shared/core/types/statusCode';

export class PlayerNotFoundError extends Error implements ServiceError {
  title: string = 'Player não encontrado';
  statusCode: number = statusCode.NOT_FOUND;

  constructor() {
    super('Player not found');
  }
}
