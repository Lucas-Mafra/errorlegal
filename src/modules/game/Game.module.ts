import { DatabaseModule } from '@infra/databases/Database.module';
import { Module } from '@nestjs/common';
import { CreateGameController } from './controllers/CreateGame.controller';
import { CreateGameService } from './services/CreateGame.service';

@Module({
  controllers: [CreateGameController],
  imports: [DatabaseModule],
  providers: [CreateGameService],
})
export class GameModule {}
