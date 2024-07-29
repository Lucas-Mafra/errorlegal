import { ErrorPresenter } from '@infra/presenters/Error.presenter';
import { Controller, Get, HttpCode, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentLoggedPlayer } from '@providers/auth/decorators/CurrentLoggedPlayer.decorator';
import { TokenPayloadSchema } from '@providers/auth/strategys/jwtStrategy';
import { statusCode } from '@shared/core/types/statusCode';
import { CharactersWithGameInfoPresenter } from '../presenters/CharactersWithGameInfo.presenter';
import { FindCharacterByPlayerIdWithGameInfoService } from '../services/FindCharacterByPlayerIdWithGameInfo.service';

@ApiTags('Character')
@Controller('character')
export class FindCharacterByPlayerIdWithGameInfoController {
  constructor(
    private readonly findCharacterByPlayerIdWithGameInfo: FindCharacterByPlayerIdWithGameInfoService,
  ) {}

  @Get('character-with-game-info')
  @HttpCode(statusCode.OK)
  async handle(
    @CurrentLoggedPlayer() { sub }: TokenPayloadSchema,
    @Query('page') page: string,
    @Query('pageSize') pageSize: string,
  ) {
    const result = await this.findCharacterByPlayerIdWithGameInfo.execute({
      sub,
      page: Number(page),
      pageSize: Number(pageSize),
    });

    if (result.isLeft()) {
      return ErrorPresenter.toHTTP(result.value);
    }

    const { characters } = result.value;

    return CharactersWithGameInfoPresenter.toHTTP(characters);
  }
}
