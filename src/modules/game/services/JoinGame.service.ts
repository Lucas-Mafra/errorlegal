import { PlayerNotFoundError } from '@modules/player/errors/PlayerNotFoundError';
import { PlayerRepository } from '@modules/player/repositories/contracts/PlayerRepository';
import { Injectable } from '@nestjs/common';
import { TokenPayloadSchema } from '@providers/auth/strategys/jwtStrategy';
import { Service } from '@shared/core/contracts/Service';
import { Either, left, right } from '@shared/core/errors/Either';
import { GameNotFoundError } from '../errors/GameNotFoundError';
import { PlayerIsAlreadyParticipatingError } from '../errors/PlayerIsAlreadyParticipatingError';
import { GameRepository } from '../repositories/contracts/GameRepository';

type Request = TokenPayloadSchema & { gameId: number };

type Errors =
  | PlayerNotFoundError
  | GameNotFoundError
  | PlayerIsAlreadyParticipatingError;

type Response = null;

@Injectable()
export class JoinGameService implements Service<Request, Errors, Response> {
  constructor(
    private readonly gameRepository: GameRepository,
    private readonly playerRepository: PlayerRepository,
  ) {}

  async execute({ sub, gameId }: Request): Promise<Either<Errors, null>> {
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

    if (isAlreadyParticipant) {
      return left(new PlayerIsAlreadyParticipatingError());
    }

    await this.gameRepository.addPlayerToGame(sub, gameId);

    return right(null);
  }
}
