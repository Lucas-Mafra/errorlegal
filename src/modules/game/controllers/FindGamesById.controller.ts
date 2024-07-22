import { ErrorPresenter } from '@infra/presenters/Error.presenter';
import { Controller, Get, HttpCode, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentLoggedPlayer } from '@providers/auth/decorators/CurrentLoggedPlayer.decorator';
import { TokenPayloadSchema } from '@providers/auth/strategys/jwtStrategy';
import { statusCode } from '@shared/core/types/statusCode';
import { GamesPresenter } from '../presenters/Games.presenter';
import { FindGamesByIdService } from '../services/FindGamesById.service';

@ApiTags('Game')
@Controller('games')
export class FindGamesByIdController {
  constructor(private readonly findGamesByIdService: FindGamesByIdService) {}

  @Get()
  @HttpCode(statusCode.OK)
  async handle(
    @CurrentLoggedPlayer() { sub }: TokenPayloadSchema,
    @Query('page') page: string,
    @Query('pageSize') pageSize: string,
  ) {
    const result = await this.findGamesByIdService.execute({
      sub,
      page: Number(page),
      pageSize: Number(pageSize),
    });

    if (result.isLeft()) {
      return ErrorPresenter.toHTTP(result.value);
    }

    const { games } = result.value;

    return games.map((game) => GamesPresenter.toHTTP(game));
  }
}
