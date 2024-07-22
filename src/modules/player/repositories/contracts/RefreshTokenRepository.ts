import { RefreshToken } from '@modules/player/entities/RefreshToken';

export abstract class RefreshTokensRepository {
  abstract create(refreshToken: RefreshToken): Promise<void>;

  abstract findUniqueByUserIdAndToken(
    playerId: number,
    token: string,
  ): Promise<RefreshToken | null>;

  abstract delete(id: number): Promise<void>;
}
