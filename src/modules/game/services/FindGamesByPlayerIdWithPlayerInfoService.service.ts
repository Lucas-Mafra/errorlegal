import { PlayerNotFoundError } from '@modules/player/errors/PlayerNotFoundError';
import { PlayerRepository } from '@modules/player/repositories/contracts/PlayerRepository';
import { Injectable } from '@nestjs/common';
import { TokenPayloadSchema } from '@providers/auth/strategys/jwtStrategy';
import { Service } from '@shared/core/contracts/Service';
import { Either, left, right } from '@shared/core/errors/Either';
import { UnauthorizedError } from '@shared/errors/UnauthorizedError';
import { GameNotFoundError } from '../errors/GameNotFoundError';
import { GameRepository } from '../repositories/contracts/GameRepository';
import { GameWithPlayerInfo } from '../valueObjects/GameWithPlayerInfo';

type Request = TokenPayloadSchema & { page: number; pageSize: number };

type Errors = PlayerNotFoundError | GameNotFoundError | UnauthorizedError;

type Response = {
  games: GameWithPlayerInfo[];
};

@Injectable()
export class FindGamesByPlayerIdWithPlayerInfoServiceService
  implements Service<Request, Errors, Response>
{
  constructor(
    private readonly gameRepository: GameRepository,
    private readonly playerRepository: PlayerRepository,
  ) {}

  async execute({
    sub,
    page,
    pageSize,
  }: Request): Promise<Either<Errors, Response>> {
    const player = await this.playerRepository.findUniqueById(sub);

    if (!player) {
      return left(new PlayerNotFoundError());
    }

    const games = await this.gameRepository.findManyByPlayerIdWithPlayerInfo(
      sub,
      page,
      pageSize,
    );

    return right({
      games,
    });
  }
}
