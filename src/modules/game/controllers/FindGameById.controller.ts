import { ErrorPresenter } from '@infra/presenters/Error.presenter';
import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentLoggedPlayer } from '@providers/auth/decorators/CurrentLoggedPlayer.decorator';
import { TokenPayloadSchema } from '@providers/auth/strategys/jwtStrategy';
import { statusCode } from '@shared/core/types/statusCode';
import { GamerPresenter } from '../presenters/Game.presenter';
import { FindGameByIdService } from '../services/FindGameById.service';

@ApiTags('Game')
@Controller('game')
export class FindGameByIdController {
  constructor(private readonly findGameByIdService: FindGameByIdService) {}

  @Get(':gameId')
  @HttpCode(statusCode.OK)
  async handle(
    @CurrentLoggedPlayer() { sub }: TokenPayloadSchema,
    @Param('gameId') param: string,
  ) {
    const result = await this.findGameByIdService.execute({
      sub,
      gameId: Number(param),
    });

    if (result.isLeft()) {
      return ErrorPresenter.toHTTP(result.value);
    }

    const { game } = result.value;

    return GamerPresenter.toHTTP(game);
  }
}
