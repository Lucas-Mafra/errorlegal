import { ErrorPresenter } from '@infra/presenters/Error.presenter';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentLoggedPlayer } from '@providers/auth/decorators/CurrentLoggedPlayer.decorator';
import { TokenPayloadSchema } from '@providers/auth/strategys/jwtStrategy';
import { statusCode } from '@shared/core/types/statusCode';
import { CreateGameDTO } from '../dto/CreateGameDTO';
import { CreateGameGateway } from '../gateways/CreatePlayer.gateway';
import { CreateGameService } from '../services/CreateGame.service';

@ApiTags('Game')
@Controller('game')
export class CreateGameController {
  constructor(private readonly createGameService: CreateGameService) {}

  @Post('create')
  @HttpCode(statusCode.CREATED)
  async handle(
    @CurrentLoggedPlayer() { sub }: TokenPayloadSchema,
    @Body(CreateGameGateway) body: CreateGameDTO,
  ) {
    const result = await this.createGameService.execute({
      ...body,
      masterId: sub,
    });

    if (result.isLeft()) {
      return ErrorPresenter.toHTTP(result.value);
    }
  }
}
