import { PlayerRepository } from '@modules/player/repositories/contracts/PlayerRepository';
import { RefreshTokensRepository } from '@modules/player/repositories/contracts/RefreshTokenRepository';
import { Module } from '@nestjs/common';
import { PlayerRepositoryImplementation } from './prisma/player/PlayerRepository';
import { RefreshTokensRepositoryImplementation } from './prisma/player/RefreshTokensRepositoryImplementation';
import { PrismaService } from './prisma/prisma.service';

@Module({
  providers: [
    PrismaService,
    {
      provide: PlayerRepository,
      useClass: PlayerRepositoryImplementation,
    },
    {
      provide: RefreshTokensRepository,
      useClass: RefreshTokensRepositoryImplementation,
    },
  ],
  exports: [PrismaService, PlayerRepository, RefreshTokensRepository],
})
export class DatabaseModule {}
