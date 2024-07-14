import { PlayerNotFoundError } from '@modules/player/errors/PlayerNotFoundError';
import { PlayerRepository } from '@modules/player/repositories/contracts/PlayerRepository';
import { Injectable } from '@nestjs/common';
import { TokenPayloadSchema } from '@providers/auth/strategys/jwtStrategy';
import { Service } from '@shared/core/contracts/Service';
import { Either, left, right } from '@shared/core/errors/Either';
import { UpdateGameDTO } from '../dto/UpdateGameDTO';
import { IsNotMasterError } from '../errors/IsNotMasterError';
import { GameRepository } from '../repositories/contracts/GameRepository';

type Request = UpdateGameDTO & TokenPayloadSchema;

type Errors = PlayerNotFoundError | IsNotMasterError;

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

    const isMaster = player.gamesAsMaster.some(
      (game) => game.toString() === gameId.toString(),
    );

    if (!isMaster) {
      return left(new IsNotMasterError());
    }

    const game = await this.gameRepository.findUniqueById(gameId);

    if (!game) {
      return left(new PlayerNotFoundError());
    }

    game.description = description;
    game.imageUrl = imageUrl;
    game.name = name;

    await this.gameRepository.update(game);

    return right(null);
  }
}
