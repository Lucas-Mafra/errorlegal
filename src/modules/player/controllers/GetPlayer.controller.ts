import { ErrorPresenter } from '@infra/presenters/Error.presenter';
import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentLoggedPlayer } from '@providers/auth/decorators/CurrentLoggedPlayer.decorator';
import { TokenPayloadSchema } from '@providers/auth/strategys/jwtStrategy';
import { statusCode } from '@shared/core/types/statusCode';
import { PlayerPresenter } from '../presenters/Player.presenter';
import { FindPlayerByIdService } from '../services/FindPlayerById.service';

@ApiTags('Player')
@Controller('player')
export class GetPlayerController {
  constructor(private readonly findPlayerByIdService: FindPlayerByIdService) {}

  @Get()
  @HttpCode(statusCode.OK)
  async handle(@CurrentLoggedPlayer() sub: TokenPayloadSchema) {
    const result = await this.findPlayerByIdService.execute(sub);

    if (result.isLeft()) {
      return ErrorPresenter.toHTTP(result.value);
    }

    const { player } = result.value;

    return PlayerPresenter.toHTTP(player);
  }
}
