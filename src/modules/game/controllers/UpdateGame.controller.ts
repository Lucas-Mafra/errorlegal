import { ErrorPresenter } from '@infra/presenters/Error.presenter';
import { Body, Controller, HttpCode, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentLoggedPlayer } from '@providers/auth/decorators/CurrentLoggedPlayer.decorator';
import { TokenPayloadSchema } from '@providers/auth/strategys/jwtStrategy';
import { statusCode } from '@shared/core/types/statusCode';
import { UpdateGameDTO } from '../dto/UpdateGameDTO';
import { UpdateGameGateway } from '../gateways/UpdateGame.gateway';
import { UpdateGameService } from '../services/UpdateGame.service';

@ApiTags('Game')
@Controller('game')
export class UpdateGameController {
  constructor(private readonly updateGameService: UpdateGameService) {}

  @Put()
  @HttpCode(statusCode.NO_CONTENT)
  async handle(
    @CurrentLoggedPlayer() { sub }: TokenPayloadSchema,
    @Body(UpdateGameGateway) body: UpdateGameDTO,
  ) {
    const result = await this.updateGameService.execute({
      ...body,
      sub,
    });

    if (result.isLeft()) {
      return ErrorPresenter.toHTTP(result.value);
    }
  }
}
