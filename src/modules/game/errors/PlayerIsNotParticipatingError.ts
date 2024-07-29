import { ServiceError } from '@shared/core/errors/ServiceError';
import { statusCode } from '@shared/core/types/statusCode';

export class PlayerIsNotParticipatingError
  extends Error
  implements ServiceError
{
  statusCode: number = statusCode.NOT_FOUND;

  constructor() {
    super('O jogador não está participando deste jogo');
  }
}
