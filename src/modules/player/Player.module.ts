import { DatabaseModule } from '@infra/databases/Database.module';
import { Module } from '@nestjs/common';
import { CryptographyModule } from '@providers/cryptography/Cryptography.module';
import { DateModule } from '@providers/date/Date.module';
import { CreatePlayerController } from './controllers/CreatePlayer.controller';
import { CreatePlayerService } from './services/CreatePlayer.service';

@Module({
  controllers: [CreatePlayerController],
  imports: [DatabaseModule, CryptographyModule, DateModule],
  providers: [CreatePlayerService],
})
export class PlayerModule {}
