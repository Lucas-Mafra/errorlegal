import { RefreshToken } from '@modules/user/entities/RefreshToken';
import { Repository } from '@shared/core/contracts/Repository';

export abstract class RefreshTokensRepository
  implements Repository<RefreshToken>
{
  abstract findMany(ctx?: unknown): Promise<RefreshToken[]>;

  abstract save(data: RefreshToken, ctx?: unknown): Promise<void>;

  abstract create(refreshToken: RefreshToken): Promise<void>;

  abstract findUnique(
    userId: number,
    token: string,
  ): Promise<RefreshToken | null>;

  abstract delete(id: number): Promise<void>;
}
