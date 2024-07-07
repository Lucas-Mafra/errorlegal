import { Injectable } from '@nestjs/common';
import { HashGenerator } from '@providers/cryptography/contracts/HashGenerator';
import { Service } from '@shared/core/contracts/Service';
import { Either, left, right } from '@shared/core/errors/Either';
import { roles } from '@shared/core/types/Roles';
import { CreatePlayerDTO } from '../dto/CreatePlayerDTO';
import { Player } from '../entities/Player';
import { NickNameAlreadyExistsError } from '../errors/NickNameAlreadyExistsError';
import { PlayerRepository } from '../repositories/PlayerRepository';

type Request = CreatePlayerDTO;

type Errors = NickNameAlreadyExistsError;

type Response = {
  player: Player;
};

@Injectable()
export class CreatePlayerService implements Service<Request, Errors, Response> {
  constructor(
    private readonly playerRepository: PlayerRepository,
    private readonly hashGenerator: HashGenerator,
  ) {}

  async execute({
    nickname,
    password,
  }: CreatePlayerDTO): Promise<Either<NickNameAlreadyExistsError, Response>> {
    const nickNameAlreadyExists =
      await this.playerRepository.findUniqueByNickName(nickname);

    if (nickNameAlreadyExists) {
      return left(new NickNameAlreadyExistsError());
    }

    const hashedPassword = await this.hashGenerator.hash(password);

    const player = new Player({
      nickname,
      password: hashedPassword,
      roleId: roles.PLAYER,
    });

    await this.playerRepository.create(player);

    return right({
      player,
    });
  }
}
