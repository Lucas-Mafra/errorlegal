import { PlayerNotFoundError } from '@modules/player/errors/PlayerNotFoundError';
import { PlayerRepository } from '@modules/player/repositories/contracts/PlayerRepository';
import { Injectable } from '@nestjs/common';
import { TokenPayloadSchema } from '@providers/auth/strategys/jwtStrategy';
import { Service } from '@shared/core/contracts/Service';
import { Either, left, right } from '@shared/core/errors/Either';
import { UnauthorizedError } from '@shared/errors/UnauthorizedError';
import { isMaster } from 'utils/isMaster';
import { FindGameByIdDTO } from '../dto/FindGameByIdDTO';
import { Game } from '../entities/Game';
import { GameNotFoundError } from '../errors/GameNotFoundError';
import { GameRepository } from '../repositories/contracts/GameRepository';

type Request = FindGameByIdDTO & TokenPayloadSchema;

type Errors = PlayerNotFoundError | GameNotFoundError | UnauthorizedError;

type Response = {
  game: Game;
};

@Injectable()
export class FindGameByIdService implements Service<Request, Errors, Response> {
  constructor(
    private readonly gameRepository: GameRepository,
    private readonly playerRepository: PlayerRepository,
  ) {}

  async execute({ sub, gameId }: Request): Promise<Either<Errors, Response>> {
    const player = await this.playerRepository.findUniqueById(sub);

    if (!player) {
      return left(new PlayerNotFoundError());
    }

    const game = await this.gameRepository.findUniqueById(Number(gameId));

    if (!game) {
      return left(new GameNotFoundError());
    }

    const isAlreadyParticipant = await this.gameRepository.hasPlayer(
      sub,
      gameId,
    );

    if (
      !isMaster({ masterId: game.masterId, playerId: sub }) &&
      !isAlreadyParticipant
    ) {
      return left(new UnauthorizedError());
    }

    return right({
      game,
    });
  }
}
