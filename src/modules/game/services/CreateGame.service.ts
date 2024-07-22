import { PlayerNotFoundError } from '@modules/player/errors/PlayerNotFoundError';
import { PlayerRepository } from '@modules/player/repositories/contracts/PlayerRepository';
import { Injectable } from '@nestjs/common';
import { Service } from '@shared/core/contracts/Service';
import { Either, left, right } from '@shared/core/errors/Either';
import { CreateGameDTO } from '../dto/CreateGameDTO';
import { Game } from '../entities/Game';
import { GameRepository } from '../repositories/contracts/GameRepository';
import { TokenPayloadSchema } from './../../../providers/auth/strategys/jwtStrategy';

type Request = TokenPayloadSchema & CreateGameDTO;

type Errors = PlayerNotFoundError;

type Response = {
  game: Game;
};

@Injectable()
export class CreateGameService implements Service<Request, Errors, Response> {
  constructor(
    private readonly gameRepository: GameRepository,
    private readonly playerRepository: PlayerRepository,
  ) {}

  async execute({
    name,
    description,
    imageUrl,
    sub,
  }: Request): Promise<Either<Errors, Response>> {
    console.log({ name, description, imageUrl, sub });
    const player = await this.playerRepository.findUniqueById(sub);

    if (!player) {
      return left(new PlayerNotFoundError());
    }

    const game = new Game({
      name,
      description,
      imageUrl,
      masterId: sub,
    });

    const _game = await this.gameRepository.create(game);
    await this.gameRepository.addPlayerToGame(sub, _game.id);

    return right({
      game,
    });
  }
}
