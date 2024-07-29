import { PlayerNotFoundError } from '@modules/player/errors/PlayerNotFoundError';
import { PlayerRepository } from '@modules/player/repositories/contracts/PlayerRepository';
import { Injectable } from '@nestjs/common';
import { TokenPayloadSchema } from '@providers/auth/strategys/jwtStrategy';
import { Service } from '@shared/core/contracts/Service';
import { Either, left, right } from '@shared/core/errors/Either';
import { isMaster } from 'utils/isMaster';
import { GameNotFoundError } from '../errors/GameNotFoundError';
import { GameRepository } from '../repositories/contracts/GameRepository';

type Request = TokenPayloadSchema & { gameId: number };

type Errors = PlayerNotFoundError | GameNotFoundError;

type Response = {
  isMaster: boolean;
  isPlayer: boolean;
};

@Injectable()
export class CheckParticipationService
  implements Service<Request, Errors, Response>
{
  constructor(
    private readonly gameRepository: GameRepository,
    private readonly playerRepository: PlayerRepository,
  ) {}

  async execute({ sub, gameId }: Request): Promise<Either<Errors, Response>> {
    const player = await this.playerRepository.findUniqueById(sub);

    if (!player) {
      return left(new PlayerNotFoundError());
    }

    const game = await this.gameRepository.findUniqueById(gameId);

    if (!game) {
      return left(new GameNotFoundError());
    }

    const isAlreadyParticipant = await this.gameRepository.hasPlayer(
      sub,
      gameId,
    );

    return right({
      isMaster: isMaster({ masterId: game.masterId, playerId: sub }),
      isPlayer: isAlreadyParticipant,
    });
  }
}
