import { env } from '@infra/env';
import { Injectable } from '@nestjs/common';
import { Encrypter } from '@providers/cryptography/contracts/Encrypter';
import { HashComparer } from '@providers/cryptography/contracts/HashComparer';
import { DateAddition } from '@providers/date/contracts/DateAddition';
import { Service } from '@shared/core/contracts/Service';
import { Either, left, right } from '@shared/core/errors/Either';
import { LoginPlayerDTO } from '../dto/LoginPlayerDTO';
import { RefreshToken } from '../entities/RefreshToken';
import { PlayerWrongCredentialsError } from '../errors/PlayerWrongCredentialsError';
import { PlayerRepository } from '../repositories/contracts/PlayerRepository';
import { RefreshTokensRepository } from '../repositories/contracts/RefreshTokenRepository';

type Request = LoginPlayerDTO;

type Errors = PlayerWrongCredentialsError;

type Response = {
  accessToken: string;
  refreshToken: string;
};

@Injectable()
export class LoginPlayerService implements Service<Request, Errors, Response> {
  constructor(
    private readonly playerRepository: PlayerRepository,
    private readonly refreshTokensRepository: RefreshTokensRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly dateAddition: DateAddition,
  ) {}

  async execute({
    name,
    password,
  }: LoginPlayerDTO): Promise<Either<PlayerWrongCredentialsError, Response>> {
    const player = await this.playerRepository.findUniqueByName(name);

    if (!player) {
      return left(new PlayerWrongCredentialsError());
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      player.password,
    );

    if (!isPasswordValid) {
      return left(new PlayerWrongCredentialsError());
    }

    const accessToken = await this.encrypter.encrypt(
      {
        sub: player.id.toString(),
      },
      {
        expiresIn: env.JWT_USER_ACCESS_EXPIRES_IN,
      },
    );

    const _refreshToken = await this.encrypter.encrypt(
      {
        sub: player.id.toString(),
      },
      {
        expiresIn: env.JWT_USER_REFRESH_EXPIRES_IN,
      },
    );

    const refreshToken = new RefreshToken({
      playerId: player.id,
      token: _refreshToken,
      expiresIn: this.dateAddition.addDaysInCurrentDate(
        env.PLAYER_REFRESH_EXPIRES_IN,
      ),
    });

    await this.refreshTokensRepository.create(refreshToken);

    return right({
      accessToken,
      refreshToken: refreshToken.token,
    });
  }
}
