import { ErrorPresenter } from '@infra/presenters/Error.presenter';
import { Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentLoggedPlayer } from '@providers/auth/decorators/CurrentLoggedPlayer.decorator';
import { TokenPayloadSchema } from '@providers/auth/strategys/jwtStrategy';
import { statusCode } from '@shared/core/types/statusCode';
import { JoinGameService } from './../services/JoinGame.service';

@ApiTags('Game')
@Controller('game')
export class JoinGameController {
  constructor(private readonly joinGameService: JoinGameService) {}

  @Post('join/:gameId')
  @HttpCode(statusCode.OK)
  async handle(
    @CurrentLoggedPlayer() { sub }: TokenPayloadSchema,
    @Param('gameId') gameId: string,
  ) {
    const result = await this.joinGameService.execute({
      sub,
      gameId: Number(gameId),
    });

    if (result.isLeft()) {
      return ErrorPresenter.toHTTP(result.value);
    }
  }
}
