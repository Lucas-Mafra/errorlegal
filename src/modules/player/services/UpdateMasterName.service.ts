import { Injectable } from '@nestjs/common';
import { TokenPayloadSchema } from '@providers/auth/strategys/jwtStrategy';
import { Service } from '@shared/core/contracts/Service';
import { Either, left, right } from '@shared/core/errors/Either';
import { PlayerNotFoundError } from '../errors/PlayerNotFoundError';
import { PlayerRepository } from '../repositories/contracts/PlayerRepository';
import { UpdateMasterNameDTO } from './../dto/UpdateMasterNameDTO';

type Request = UpdateMasterNameDTO & TokenPayloadSchema;

type Errors = PlayerNotFoundError;

type Response = null;

@Injectable()
export class UpdateMasterNameService
  implements Service<Request, Errors, Response>
{
  constructor(private readonly playerRepository: PlayerRepository) {}

  async execute({
    sub,
    masterName,
  }: Request): Promise<Either<Errors, Response>> {
    const player = await this.playerRepository.findUniqueById(sub);

    if (!player) {
      return left(new PlayerNotFoundError());
    }

    player.masterName = masterName;

    await this.playerRepository.update(player);

    return right(null);
  }
}
