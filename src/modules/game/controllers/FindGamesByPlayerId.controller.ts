import { ErrorPresenter } from '@infra/presenters/Error.presenter';
import { Controller, Get, HttpCode, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentLoggedPlayer } from '@providers/auth/decorators/CurrentLoggedPlayer.decorator';
import { TokenPayloadSchema } from '@providers/auth/strategys/jwtStrategy';
import { statusCode } from '@shared/core/types/statusCode';
import { GamesWithPlayerInfoPresenter } from '../presenters/GamesWithPlayerInfo.presenter';
import { FindGamesByPlayerIdWithPlayerInfoServiceService } from '../services/FindGamesByPlayerIdWithPlayerInfoService.service';

@ApiTags('Game')
@Controller('game')
export class FindGamesByPlayerIdWithPlayerInfoController {
  constructor(
    private readonly findGamesByPlayerIdWithPlayerInfoService: FindGamesByPlayerIdWithPlayerInfoServiceService,
  ) {}

  @Get('game-with-player-info')
  @HttpCode(statusCode.OK)
  async handle(
    @CurrentLoggedPlayer() { sub }: TokenPayloadSchema,
    @Query('page') page: string,
    @Query('pageSize') pageSize: string,
  ) {
    const result = await this.findGamesByPlayerIdWithPlayerInfoService.execute({
      sub,
      page: Number(page),
      pageSize: Number(pageSize),
    });

    if (result.isLeft()) {
      return ErrorPresenter.toHTTP(result.value);
    }

    const { games } = result.value;

    return GamesWithPlayerInfoPresenter.toHTTP(games);
  }
}
