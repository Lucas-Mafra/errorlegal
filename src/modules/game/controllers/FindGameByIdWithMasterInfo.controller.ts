import { ErrorPresenter } from '@infra/presenters/Error.presenter';
import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentLoggedPlayer } from '@providers/auth/decorators/CurrentLoggedPlayer.decorator';
import { TokenPayloadSchema } from '@providers/auth/strategys/jwtStrategy';
import { statusCode } from '@shared/core/types/statusCode';
import { GamesWithMasterInfoPresenter } from '../presenters/GamesWithMasterInfo.presenter';
import { FindGameByIdWithMasterInfoService } from '../services/FindGameByIdWithMasterInfoService.service';

@ApiTags('Game')
@Controller('game')
export class FindGameByIdWithMasterInfoController {
  constructor(
    private readonly findGameByIdWithMasterInfoService: FindGameByIdWithMasterInfoService,
  ) {}

  @Get('/game-with-master-info/:gameId')
  @HttpCode(statusCode.OK)
  async handle(
    @CurrentLoggedPlayer() { sub }: TokenPayloadSchema,
    @Param('gameId') param: string,
  ) {
    const result = await this.findGameByIdWithMasterInfoService.execute({
      sub,
      gameId: Number(param),
    });

    if (result.isLeft()) {
      return ErrorPresenter.toHTTP(result.value);
    }

    const { game } = result.value;

    return GamesWithMasterInfoPresenter.toHTTP(game);
  }
}
