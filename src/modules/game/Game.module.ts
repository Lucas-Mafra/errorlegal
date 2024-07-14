import { DatabaseModule } from '@infra/databases/Database.module';
import { Module } from '@nestjs/common';
import { CreateGameController } from './controllers/CreateGame.controller';
import { DeleteGameController } from './controllers/DeleteGame.controller';
import { FindGameByIdController } from './controllers/FindGameById.controller';
import { UpdateGameController } from './controllers/UpdateGame.controller';
import { CreateGameService } from './services/CreateGame.service';
import { DeleteGameService } from './services/DeleteGame.service';
import { FindGameByIdService } from './services/FindGameById.service';
import { UpdateGameService } from './services/UpdateGame.service';

@Module({
  controllers: [
    CreateGameController,
    DeleteGameController,
    FindGameByIdController,
    UpdateGameController,
  ],
  imports: [DatabaseModule],
  providers: [
    CreateGameService,
    DeleteGameService,
    FindGameByIdService,
    UpdateGameService,
  ],
})
export class GameModule {}
