import { DatabaseModule } from '@infra/databases/Database.module';
import { Module } from '@nestjs/common';
import { CryptographyModule } from '@providers/cryptography/Cryptography.module';
import { DateModule } from '@providers/date/Date.module';
import { CreatePlayerController } from './controllers/CreatePlayer.controller';
import { GetPlayerController } from './controllers/GetPlayer.controller';
import { LoginPlayerController } from './controllers/LoginPlayer.controller';
import { RefreshTokenController } from './controllers/RefreshToken.controller';
import { CreatePlayerService } from './services/CreatePlayer.service';
import { FindPlayerByIdService } from './services/FindPlayerById.service';
import { LoginPlayerService } from './services/LoginPlayer.service';
import { RefreshTokenService } from './services/RefreshToken.service';

@Module({
  controllers: [
    CreatePlayerController,
    LoginPlayerController,
    GetPlayerController,
    RefreshTokenController,
  ],
  imports: [DatabaseModule, CryptographyModule, DateModule],
  providers: [
    CreatePlayerService,
    FindPlayerByIdService,
    LoginPlayerService,
    FindPlayerByIdService,
    RefreshTokenService,
  ],
})
export class PlayerModule {}
