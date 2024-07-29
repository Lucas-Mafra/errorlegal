import { ServiceError } from '@shared/core/errors/ServiceError';
import { statusCode } from '@shared/core/types/statusCode';

export class PlayerIsAlreadyParticipatingError
  extends Error
  implements ServiceError
{
  statusCode: number = statusCode.CONFLICT;

  constructor() {
    super('Jogador já participa do jogo');
  }
}
