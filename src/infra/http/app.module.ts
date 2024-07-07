import { PlayerModule } from '@modules/player/Player.module';
import { Module } from '@nestjs/common';
import { AuthModule } from '@providers/auth/Auth.module';

@Module({
  imports: [AuthModule, PlayerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
