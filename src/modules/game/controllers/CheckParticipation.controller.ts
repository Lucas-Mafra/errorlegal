import { ErrorPresenter } from '@infra/presenters/Error.presenter';
import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentLoggedPlayer } from '@providers/auth/decorators/CurrentLoggedPlayer.decorator';
import { TokenPayloadSchema } from '@providers/auth/strategys/jwtStrategy';
import { statusCode } from '@shared/core/types/statusCode';
import { CheckParticipationService } from '../services/CheckParticipation.service';

@ApiTags('Game')
@Controller('game')
export class CheckParticipationController {
  constructor(
    private readonly checkParticipationService: CheckParticipationService,
  ) {}

  @Get('check-participation/:gameId')
  @HttpCode(statusCode.OK)
  async handle(
    @CurrentLoggedPlayer() { sub }: TokenPayloadSchema,
    @Param('gameId') gameId: string,
  ) {
    const result = await this.checkParticipationService.execute({
      sub,
      gameId: Number(gameId),
    });

    if (result.isLeft()) {
      return ErrorPresenter.toHTTP(result.value);
    }

    return result.value;
  }
}
