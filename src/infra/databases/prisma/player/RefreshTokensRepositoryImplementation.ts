import { RefreshToken } from '@modules/player/entities/RefreshToken';
import { RefreshTokensRepository } from '@modules/player/repositories/contracts/RefreshTokenRepository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { RefreshTokensPrismaMapper } from './RefreshTokensPrismaMapper';

@Injectable()
export class RefreshTokensRepositoryImplementation
  implements RefreshTokensRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async create(refreshToken: RefreshToken): Promise<void> {
    await this.prisma.refreshToken.create({
      data: RefreshTokensPrismaMapper.toPrisma(refreshToken),
    });
  }

  async findUniqueByUserIdAndToken(
    playerId: number,
    token: string,
  ): Promise<RefreshToken | null> {
    const refreshToken = await this.prisma.refreshToken.findFirst({
      where: {
        playerId,
        token,
      },
    });

    if (refreshToken) {
      return RefreshTokensPrismaMapper.toEntity(refreshToken);
    }
    return null;
  }

  async delete(id: number): Promise<void> {
    await this.prisma.refreshToken.delete({
      where: {
        id,
      },
    });
  }
}
