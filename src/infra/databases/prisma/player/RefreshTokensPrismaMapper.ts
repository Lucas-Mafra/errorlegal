import { RefreshToken } from '@modules/player/entities/RefreshToken';
import { Prisma, RefreshToken as RefreshTokenPrisma } from '@prisma/client';

export class RefreshTokensPrismaMapper {
  static toEntity(raw: RefreshTokenPrisma): RefreshToken {
    return new RefreshToken(
      {
        playerId: raw.playerId,
        token: raw.token,
        expiresIn: raw.expiresIn,
        createdAt: raw.createdAt,
      },
      raw.id,
    );
  }

  static toPrisma(
    refreshToken: RefreshToken,
  ): Prisma.RefreshTokenUncheckedCreateInput {
    return {
      expiresIn: refreshToken.expiresIn,
      playerId: refreshToken.playerId,
      token: refreshToken.token,
      createdAt: refreshToken.createdAt,
    };
  }
}
