import { GameNotFoundError } from '@modules/game/errors/GameNotFoundError';
import { GameRepository } from '@modules/game/repositories/contracts/GameRepository';
import { PlayerNotFoundError } from '@modules/player/errors/PlayerNotFoundError';
import { PlayerRepository } from '@modules/player/repositories/contracts/PlayerRepository';
import { Injectable } from '@nestjs/common';
import { TokenPayloadSchema } from '@providers/auth/strategys/jwtStrategy';
import { Service } from '@shared/core/contracts/Service';
import { Either, left, right } from '@shared/core/errors/Either';
import { CreateCharacterDTO } from '../dto/CreateCharacterDTO';
import { Character } from '../entities/Character';
import { NicknameAlreadyExistsError } from '../errors/NicknameAlreadyExistsError';
import { CharacterRepository } from '../repositories/contracts/CharacterRepository';

type Request = CreateCharacterDTO & TokenPayloadSchema;

type Errors =
  | PlayerNotFoundError
  | GameNotFoundError
  | NicknameAlreadyExistsError;

type Response = {
  character: Character;
};

@Injectable()
export class CreateCharacterService
  implements Service<Request, Errors, Response>
{
  constructor(
    private readonly gameRepository: GameRepository,
    private readonly characterRepository: CharacterRepository,
    private readonly playerRepository: PlayerRepository,
  ) {}

  async execute({
    gameId,
    nickname,
    sub,
  }: Request): Promise<Either<Errors, Response>> {
    const player = await this.playerRepository.findUniqueById(sub);

    if (!player) {
      return left(new PlayerNotFoundError());
    }

    const game = await this.gameRepository.findUniqueById(gameId);

    if (!game) {
      return left(new GameNotFoundError());
    }

    const _character =
      await this.characterRepository.findUniqueByNickname(nickname);

    if (_character) {
      return left(new NicknameAlreadyExistsError());
    }

    const character = new Character({
      nickname,
      playerId: sub,
      gameId,
    });

    await this.characterRepository.create(character);

    return right({
      character,
    });
  }
}
