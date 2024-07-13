import { GameRepository } from '@modules/game/repositories/contracts/GameRepository';
import { PlayerRepository } from '@modules/player/repositories/contracts/PlayerRepository';
import { RefreshTokensRepository } from '@modules/player/repositories/contracts/RefreshTokenRepository';
import { Module } from '@nestjs/common';
import { GameRepositoryImplementation } from './prisma/game/GameRepository';
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
    {
      provide: GameRepository,
      useClass: GameRepositoryImplementation,
    },
  ],
  exports: [
    PrismaService,
    PlayerRepository,
    RefreshTokensRepository,
    GameRepository,
  ],
})
export class DatabaseModule {}
