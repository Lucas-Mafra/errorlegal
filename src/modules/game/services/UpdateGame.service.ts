import { PlayerNotFoundError } from '@modules/player/errors/PlayerNotFoundError';
import { PlayerRepository } from '@modules/player/repositories/contracts/PlayerRepository';
import { Injectable } from '@nestjs/common';
import { TokenPayloadSchema } from '@providers/auth/strategys/jwtStrategy';
import { Service } from '@shared/core/contracts/Service';
import { Either, left, right } from '@shared/core/errors/Either';
import { UnauthorizedError } from '@shared/errors/UnauthorizedError';
import { isMaster } from 'utils/isMaster';
import { UpdateGameDTO } from '../dto/UpdateGameDTO';
import { GameRepository } from '../repositories/contracts/GameRepository';

type Request = UpdateGameDTO & TokenPayloadSchema;

type Errors = PlayerNotFoundError | UnauthorizedError;

type Response = null;

@Injectable()
export class UpdateGameService implements Service<Request, Errors, Response> {
  constructor(
    private readonly gameRepository: GameRepository,
    private readonly playerRepository: PlayerRepository,
  ) {}

  async execute({
    sub,
    gameId,
    description,
    imageUrl,
    name,
  }: Request): Promise<Either<Errors, Response>> {
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

    game.description = description;
    game.imageUrl = imageUrl;
    game.name = name;

    await this.gameRepository.update(game);

    return right(null);
  }
}
