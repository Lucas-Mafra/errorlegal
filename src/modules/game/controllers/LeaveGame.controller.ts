import { ErrorPresenter } from '@infra/presenters/Error.presenter';
import { Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentLoggedPlayer } from '@providers/auth/decorators/CurrentLoggedPlayer.decorator';
import { TokenPayloadSchema } from '@providers/auth/strategys/jwtStrategy';
import { statusCode } from '@shared/core/types/statusCode';
import { LeaveGameService } from '../services/LeaveGame.service';

@ApiTags('Game')
@Controller('game')
export class LeaveGameController {
  constructor(private readonly leaveGameService: LeaveGameService) {}

  @Post('leave/:gameId')
  @HttpCode(statusCode.OK)
  async handle(
    @CurrentLoggedPlayer() { sub }: TokenPayloadSchema,
    @Param('gameId') gameId: string,
  ) {
    const result = await this.leaveGameService.execute({
      sub,
      gameId: Number(gameId),
    });

    if (result.isLeft()) {
      return ErrorPresenter.toHTTP(result.value);
    }
  }
}
