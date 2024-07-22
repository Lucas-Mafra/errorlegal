import { Injectable } from '@nestjs/common';
import { TokenPayloadSchema } from '@providers/auth/strategys/jwtStrategy';
import { Service } from '@shared/core/contracts/Service';
import { Either, left, right } from '@shared/core/errors/Either';
import { Player } from '../entities/Player';
import { NickNameAlreadyExistsError } from '../errors/NickNameAlreadyExistsError';
import { PlayerNotFoundError } from '../errors/PlayerNotFoundError';
import { PlayerRepository } from '../repositories/contracts/PlayerRepository';

type Request = TokenPayloadSchema;

type Errors = PlayerNotFoundError;

type Response = {
  player: Player;
};

@Injectable()
export class FindPlayerByIdService
  implements Service<Request, Errors, Response>
{
  constructor(private readonly playerRepository: PlayerRepository) {}

  async execute({
    sub,
  }: Request): Promise<Either<NickNameAlreadyExistsError, Response>> {
    const player = await this.playerRepository.findUniqueById(sub);

    if (!player) {
      return left(new PlayerNotFoundError());
    }

    return right({
      player,
    });
  }
}
