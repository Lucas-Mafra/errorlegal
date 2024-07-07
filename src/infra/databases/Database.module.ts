import { PlayerRepository } from '@modules/player/repositories/PlayerRepository';
import { Module } from '@nestjs/common';
import { PlayerRepositoryImplementation } from './prisma/player/PlayerRepository';
import { PrismaService } from './prisma/prisma.service';

@Module({
  providers: [
    PrismaService,
    {
      provide: PlayerRepository,
      useClass: PlayerRepositoryImplementation,
    },
  ],
  exports: [PrismaService, PlayerRepository],
})
export class DatabaseModule {}
