import { ServiceError } from '@shared/core/errors/ServiceError';
import { statusCode } from '@shared/core/types/statusCode';

export class PlayerAlreadyHasCharacterError
  extends Error
  implements ServiceError
{
  statusCode: number = statusCode.FORBIDDEN;

  constructor() {
    super('O jogador já possui um personagem no jogo atual');
  }
}
