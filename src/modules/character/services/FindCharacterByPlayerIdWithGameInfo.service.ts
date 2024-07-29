import { PlayerNotFoundError } from '@modules/player/errors/PlayerNotFoundError';
import { PlayerRepository } from '@modules/player/repositories/contracts/PlayerRepository';
import { Injectable } from '@nestjs/common';
import { TokenPayloadSchema } from '@providers/auth/strategys/jwtStrategy';
import { Service } from '@shared/core/contracts/Service';
import { Either, left, right } from '@shared/core/errors/Either';
import { UnauthorizedError } from '@shared/errors/UnauthorizedError';
import { CharacterNotFoundError } from '../errors/CharacterNotFoundError';
import { CharacterRepository } from '../repositories/contracts/CharacterRepository';
import { CharacterWithGameInfo } from '../valueObjects/CharacterWithGameInfo';

type Request = TokenPayloadSchema & { page: number; pageSize: number };

type Errors = PlayerNotFoundError | CharacterNotFoundError | UnauthorizedError;

type Response = {
  characters: CharacterWithGameInfo[];
};

@Injectable()
export class FindCharacterByPlayerIdWithGameInfoService
  implements Service<Request, Errors, Response>
{
  constructor(
    private readonly characterRepository: CharacterRepository,
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

    const characters =
      await this.characterRepository.findManyByPlayerIdWithGameInfo(
        sub,
        page,
        pageSize,
      );

    return right({
      characters,
    });
  }
}
