import { Injectable } from '@nestjs/common';
import { HashGenerator } from '@providers/cryptography/contracts/HashGenerator';
import { Service } from '@shared/core/contracts/Service';
import { Either, left, right } from '@shared/core/errors/Either';
import { CreatePlayerDTO } from '../dto/CreatePlayerDTO';
import { Player } from '../entities/Player';
import { NickNameAlreadyExistsError } from '../errors/NickNameAlreadyExistsError';
import { PlayerRepository } from '../repositories/contracts/PlayerRepository';

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
    name,
    password,
  }: CreatePlayerDTO): Promise<Either<Errors, Response>> {
    const nickNameAlreadyExists =
      await this.playerRepository.findUniqueByName(name);

    if (nickNameAlreadyExists) {
      return left(new NickNameAlreadyExistsError());
    }

    const hashedPassword = await this.hashGenerator.hash(password);

    const player = new Player({
      name,
      password: hashedPassword,
    });

    await this.playerRepository.create(player);

    return right({
      player,
    });
  }
}
