import { ErrorPresenter } from '@infra/presenters/Error.presenter';
import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentLoggedPlayer } from '@providers/auth/decorators/CurrentLoggedPlayer.decorator';
import { TokenPayloadSchema } from '@providers/auth/strategys/jwtStrategy';
import { statusCode } from '@shared/core/types/statusCode';
import { DeleteGameDTO } from '../dto/DeleteGameDTO';
import { DeleteGameGateway } from '../gateways/DeleteGame.gateway';
import { DeleteGameService } from '../services/DeleteGame.service';

@ApiTags('Game')
@Controller('game')
export class DeleteGameController {
  constructor(private readonly deleteGameService: DeleteGameService) {}

  @Delete('delete')
  @HttpCode(statusCode.OK)
  async handle(
    @CurrentLoggedPlayer() { sub }: TokenPayloadSchema,
    @Param(DeleteGameGateway) param: DeleteGameDTO,
  ) {
    const result = await this.deleteGameService.execute({
      gameId: param.gameId,
      sub,
    });

    if (result.isLeft()) {
      return ErrorPresenter.toHTTP(result.value);
    }
  }
}
