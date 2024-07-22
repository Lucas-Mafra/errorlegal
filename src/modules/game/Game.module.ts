import { DatabaseModule } from '@infra/databases/Database.module';
import { Module } from '@nestjs/common';
import { CreateGameController } from './controllers/CreateGame.controller';
import { DeleteGameController } from './controllers/DeleteGame.controller';
import { FindGameByIdController } from './controllers/FindGameById.controller';
import { FindGamesByIdController } from './controllers/FindGamesById.controller';
import { UpdateGameController } from './controllers/UpdateGame.controller';
import { CreateGameService } from './services/CreateGame.service';
import { DeleteGameService } from './services/DeleteGame.service';
import { FindGameByIdService } from './services/FindGameById.service';
import { FindGamesByIdService } from './services/FindGamesById.service';
import { UpdateGameService } from './services/UpdateGame.service';

@Module({
  controllers: [
    CreateGameController,
    DeleteGameController,
    FindGameByIdController,
    FindGamesByIdController,
    UpdateGameController,
  ],
  imports: [DatabaseModule],
  providers: [
    CreateGameService,
    DeleteGameService,
    FindGameByIdService,
    FindGamesByIdService,
    UpdateGameService,
  ],
})
export class GameModule {}
