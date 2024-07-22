import { PlayerNotFoundError } from '@modules/player/errors/PlayerNotFoundError';
import { PlayerRepository } from '@modules/player/repositories/contracts/PlayerRepository';
import { Injectable } from '@nestjs/common';
import { TokenPayloadSchema } from '@providers/auth/strategys/jwtStrategy';
import { Service } from '@shared/core/contracts/Service';
import { Either, left, right } from '@shared/core/errors/Either';
import { UnauthorizedError } from '@shared/errors/UnauthorizedError';
import { isCharacterOwner } from 'utils/isCharacterOwner';
import { FindCharacterByIdDTO } from '../dto/FindCharacterByIdDTO';
import { Character } from '../entities/Character';
import { CharacterNotFoundError } from '../errors/CharacterNotFoundError';
import { CharacterRepository } from '../repositories/contracts/CharacterRepository';

type Request = FindCharacterByIdDTO & TokenPayloadSchema;

type Errors = PlayerNotFoundError | CharacterNotFoundError | UnauthorizedError;

type Response = {
  character: Character;
};

@Injectable()
export class FindCharacterByIdService
  implements Service<Request, Errors, Response>
{
  constructor(
    private readonly characterRepository: CharacterRepository,
    private readonly playerRepository: PlayerRepository,
  ) {}

  async execute({
    sub,
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

    return right({
      character,
    });
  }
}
