import { ErrorPresenter } from '@infra/presenters/Error.presenter';
import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentLoggedPlayer } from '@providers/auth/decorators/CurrentLoggedPlayer.decorator';
import { TokenPayloadSchema } from '@providers/auth/strategys/jwtStrategy';
import { statusCode } from '@shared/core/types/statusCode';
import { GamerPresenter } from '../presenters/Game.presenter';
import { FindGameByInviteCodeService } from '../services/FindGameByInviteCode.service';

@ApiTags('Game')
@Controller('game')
export class FindGameByInviteCodeController {
  constructor(
    private readonly findGameByInviteCodeService: FindGameByInviteCodeService,
  ) {}

  @Get('/invite/:inviteCode')
  @HttpCode(statusCode.OK)
  async handle(
    @CurrentLoggedPlayer() { sub }: TokenPayloadSchema,
    @Param('inviteCode') param: string,
  ) {
    const result = await this.findGameByInviteCodeService.execute({
      sub,
      inviteCode: param,
    });

    if (result.isLeft()) {
      return ErrorPresenter.toHTTP(result.value);
    }

    const { game } = result.value;

    return GamerPresenter.toHTTP(game);
  }
}
