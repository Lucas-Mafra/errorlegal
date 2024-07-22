import { PlayerNotFoundError } from '@modules/player/errors/PlayerNotFoundError';
import { PlayerRepository } from '@modules/player/repositories/contracts/PlayerRepository';
import { Injectable } from '@nestjs/common';
import { TokenPayloadSchema } from '@providers/auth/strategys/jwtStrategy';
import { Service } from '@shared/core/contracts/Service';
import { Either, left, right } from '@shared/core/errors/Either';
import { isCharacterOwner } from 'utils/isCharacterOwner';
import { UnauthorizedError } from '../../../shared/errors/UnauthorizedError';
import { UpdateCharacterDTO } from '../dto/UpdateCharacterDTO';
import { CharacterNotFoundError } from '../errors/CharacterNotFoundError';
import { CharacterRepository } from '../repositories/contracts/CharacterRepository';

type Request = { characterId: number } & UpdateCharacterDTO &
  TokenPayloadSchema;

type Errors = PlayerNotFoundError | CharacterNotFoundError | UnauthorizedError;

type Response = null;

@Injectable()
export class UpdateCharacterService
  implements Service<Request, Errors, Response>
{
  constructor(
    private readonly characterRepository: CharacterRepository,
    private readonly playerRepository: PlayerRepository,
  ) {}

  async execute({
    sub,
    nickname,
    characterId,
  }: Request): Promise<Either<Errors, Response>> {
    const player = await this.playerRepository.findUniqueById(sub);

    if (!player) {
      return left(new PlayerNotFoundError());
    }

    const character =
      await this.characterRepository.findUniqueById(characterId);

    if (!character) {
      return left(new CharacterNotFoundError());
    }

    if (!isCharacterOwner({ characterId, playerId: sub })) {
      return left(new UnauthorizedError());
    }

    character.nickname = nickname;

    await this.characterRepository.update(character);

    return right(null);
  }
}
