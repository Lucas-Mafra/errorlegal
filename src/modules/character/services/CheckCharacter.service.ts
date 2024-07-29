import { GameNotFoundError } from '@modules/game/errors/GameNotFoundError';
import { GameRepository } from '@modules/game/repositories/contracts/GameRepository';
import { PlayerNotFoundError } from '@modules/player/errors/PlayerNotFoundError';
import { PlayerRepository } from '@modules/player/repositories/contracts/PlayerRepository';
import { Injectable } from '@nestjs/common';
import { TokenPayloadSchema } from '@providers/auth/strategys/jwtStrategy';
import { Service } from '@shared/core/contracts/Service';
import { Either, left, right } from '@shared/core/errors/Either';
import { CharacterNotFoundError } from '../errors/CharacterNotFoundError';
import { CharacterRepository } from '../repositories/contracts/CharacterRepository';

type Request = TokenPayloadSchema & { gameId: number };

type Errors = PlayerNotFoundError | CharacterNotFoundError | GameNotFoundError;

type Response = {
  hasCharacter: boolean;
};

@Injectable()
export class CheckCharacterService
  implements Service<Request, Errors, Response>
{
  constructor(
    private readonly characterRepository: CharacterRepository,
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

    const character = await this.characterRepository.hasCharacter(sub, gameId);

    return right({
      hasCharacter: character,
    });
  }
}
