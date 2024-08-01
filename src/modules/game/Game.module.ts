import { DatabaseModule } from '@infra/databases/Database.module';
import { Module } from '@nestjs/common';
import { CheckParticipationController } from './controllers/CheckParticipation.controller';
import { CreateGameController } from './controllers/CreateGame.controller';
import { DeleteGameController } from './controllers/DeleteGame.controller';
import { FindGameByIdController } from './controllers/FindGameById.controller';
import { FindGameByIdWithMasterInfoController } from './controllers/FindGameByIdWithMasterInfo.controller';
import { FindGameByInviteCodeController } from './controllers/FindGameByInviteCode.controller';
import { FindGamesByPlayerIdWithPlayerInfoController } from './controllers/FindGamesByPlayerId.controller';
import { JoinGameController } from './controllers/JoinGame.controller';
import { LeaveGameController } from './controllers/LeaveGame.controller';
import { UpdateGameController } from './controllers/UpdateGame.controller';
import { CheckParticipationService } from './services/CheckParticipation.service';
import { CreateGameService } from './services/CreateGame.service';
import { DeleteGameService } from './services/DeleteGame.service';
import { FindGameByIdService } from './services/FindGameById.service';
import { FindGameByIdWithMasterInfoService } from './services/FindGameByIdWithMasterInfoService.service';
import { FindGameByInviteCodeService } from './services/FindGameByInviteCode.service';
import { FindGamesByPlayerIdWithPlayerInfoServiceService } from './services/FindGamesByPlayerIdWithPlayerInfoService.service';
import { JoinGameService } from './services/JoinGame.service';
import { LeaveGameService } from './services/LeaveGame.service';
import { UpdateGameService } from './services/UpdateGame.service';

@Module({
  controllers: [
    CheckParticipationController,
    CreateGameController,
    FindGameByIdController,
    FindGamesByPlayerIdWithPlayerInfoController,
    FindGameByIdWithMasterInfoController,
    FindGameByInviteCodeController,
    JoinGameController,
    LeaveGameController,
    UpdateGameController,
    DeleteGameController,
  ],
  imports: [DatabaseModule],
  providers: [
    CheckParticipationService,
    CreateGameService,
    FindGameByIdService,
    FindGamesByPlayerIdWithPlayerInfoServiceService,
    FindGameByIdWithMasterInfoService,
    FindGameByInviteCodeService,
    JoinGameService,
    LeaveGameService,
    UpdateGameService,
    DeleteGameService,
  ],
})
export class GameModule {}
