import { PlayerNotFoundError } from '@modules/player/errors/PlayerNotFoundError';
import { PlayerRepository } from '@modules/player/repositories/contracts/PlayerRepository';
import { Injectable } from '@nestjs/common';
import { TokenPayloadSchema } from '@providers/auth/strategys/jwtStrategy';
import { Service } from '@shared/core/contracts/Service';
import { Either, left, right } from '@shared/core/errors/Either';
import { UnauthorizedError } from '@shared/errors/UnauthorizedError';
import { FindGameByInviteCodeDTO } from '../dto/FindGameByInviteCodeDTO';
import { Game } from '../entities/Game';
import { GameNotFoundError } from '../errors/GameNotFoundError';
import { GameRepository } from '../repositories/contracts/GameRepository';

type Request = FindGameByInviteCodeDTO & TokenPayloadSchema;

type Errors = PlayerNotFoundError | GameNotFoundError | UnauthorizedError;

type Response = {
  game: Game;
};

@Injectable()
export class FindGameByInviteCodeService
  implements Service<Request, Errors, Response>
{
  constructor(
    private readonly gameRepository: GameRepository,
    private readonly playerRepository: PlayerRepository,
  ) {}

  async execute({
    sub,
    inviteCode,
  }: Request): Promise<Either<Errors, Response>> {
    const player = await this.playerRepository.findUniqueById(sub);

    if (!player) {
      return left(new PlayerNotFoundError());
    }

    const game = await this.gameRepository.findGameByInviteCode(inviteCode);

    if (!game) {
      return left(new GameNotFoundError());
    }

    return right({
      game,
    });
  }
}
