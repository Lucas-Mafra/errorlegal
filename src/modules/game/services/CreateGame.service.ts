import { PlayerNotFoundError } from '@modules/player/errors/PlayerNotFoundError';
import { PlayerRepository } from '@modules/player/repositories/contracts/PlayerRepository';
import { Injectable } from '@nestjs/common';
import { Service } from '@shared/core/contracts/Service';
import { Either, left, right } from '@shared/core/errors/Either';
import { CreateGameDTO } from '../dto/CreateGameDTO';
import { Game } from '../entities/Game';
import { GameRepository } from '../repositories/contracts/GameRepository';

type Request = CreateGameDTO;

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
    masterId,
  }: CreateGameDTO): Promise<Either<Errors, Response>> {
    const player = await this.playerRepository.findUniqueById(masterId);

    if (!player) {
      return left(new PlayerNotFoundError());
    }

    const game = new Game({
      name,
      description,
      imageUrl,
      masterId,
    });

    await this.gameRepository.create(game);

    return right({
      game,
    });
  }
}
