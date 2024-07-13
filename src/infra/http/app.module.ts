import { GameModule } from '@modules/game/Game.module';
import { PlayerModule } from '@modules/player/Player.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@providers/auth/Auth.module';
import { CryptographyModule } from '@providers/cryptography/Cryptography.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    CryptographyModule,
    PlayerModule,
    GameModule,
  ],
})
export class AppModule {}
