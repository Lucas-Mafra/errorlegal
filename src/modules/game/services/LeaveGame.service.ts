import { PlayerNotFoundError } from '@modules/player/errors/PlayerNotFoundError';
import { PlayerRepository } from '@modules/player/repositories/contracts/PlayerRepository';
import { Injectable } from '@nestjs/common';
import { TokenPayloadSchema } from '@providers/auth/strategys/jwtStrategy';
import { Service } from '@shared/core/contracts/Service';
import { Either, left, right } from '@shared/core/errors/Either';
import { isMaster } from 'utils/isMaster';
import { GameNotFoundError } from '../errors/GameNotFoundError';
import { MasterCannotLeaveOwnGameError } from '../errors/MasterCannotLeaveOwnGameError';
import { PlayerIsNotParticipatingError } from '../errors/PlayerIsNotParticipatingError';
import { GameRepository } from '../repositories/contracts/GameRepository';

type Request = TokenPayloadSchema & { gameId: number };

type Errors =
  | PlayerNotFoundError
  | GameNotFoundError
  | MasterCannotLeaveOwnGameError;

type Response = null;

@Injectable()
export class LeaveGameService implements Service<Request, Errors, Response> {
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

    if (isMaster({ masterId: game.masterId, playerId: sub })) {
      return left(new MasterCannotLeaveOwnGameError());
    }

    const isParticipant = await this.gameRepository.hasPlayer(sub, gameId);

    if (!isParticipant) {
      return left(new PlayerIsNotParticipatingError());
    }

    await this.gameRepository.removePlayerFromGame(sub, gameId);

    return right(null);
  }
}
