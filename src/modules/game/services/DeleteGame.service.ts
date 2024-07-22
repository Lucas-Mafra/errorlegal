import { PlayerNotFoundError } from '@modules/player/errors/PlayerNotFoundError';
import { PlayerRepository } from '@modules/player/repositories/contracts/PlayerRepository';
import { Injectable } from '@nestjs/common';
import { TokenPayloadSchema } from '@providers/auth/strategys/jwtStrategy';
import { Service } from '@shared/core/contracts/Service';
import { Either, left, right } from '@shared/core/errors/Either';
import { UnauthorizedError } from '@shared/errors/UnauthorizedError';
import { isMaster } from 'utils/isMaster';
import { DeleteGameDTO } from '../dto/DeleteGameDTO';
import { GameRepository } from '../repositories/contracts/GameRepository';

type Request = DeleteGameDTO & TokenPayloadSchema;

type Errors = PlayerNotFoundError | UnauthorizedError;

type Response = null;

@Injectable()
export class DeleteGameService implements Service<Request, Errors, Response> {
  constructor(
    private readonly gameRepository: GameRepository,
    private readonly playerRepository: PlayerRepository,
  ) {}

  async execute({ gameId, sub }: Request): Promise<Either<Errors, Response>> {
    const player = await this.playerRepository.findUniqueById(sub);

    if (!player) {
      return left(new PlayerNotFoundError());
    }

    const game = await this.gameRepository.findUniqueById(gameId);

    if (!game) {
      return left(new PlayerNotFoundError());
    }

    if (!isMaster({ masterId: game.masterId, playerId: sub })) {
      return left(new UnauthorizedError());
    }

    await this.gameRepository.removePlayerFromGame(sub, gameId);
    await this.gameRepository.delete(gameId);

    return right(null);
  }
}
