import { ServiceError } from '@shared/core/errors/ServiceError';
import { statusCode } from '@shared/core/types/statusCode';

export class MasterCannotLeaveOwnGameError
  extends Error
  implements ServiceError
{
  statusCode: number = statusCode.FORBIDDEN;

  constructor() {
    super('O mestre não pode sair do próprio jogo');
  }
}
