import { ErrorPresenter } from '@infra/presenters/Error.presenter';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@providers/auth/decorators/IsPublic.decorator';
import { statusCode } from '@shared/core/types/statusCode';
import { CreatePlayerDTO } from '../dto/CreatePlayerDTO';
import { CreatePlayerGateway } from '../gateways/CreatePlayer.gateway';
import { CreatePlayerService } from '../services/CreatePlayer.service';

@ApiTags('Player')
@Controller('player')
export class CreatePlayerController {
  constructor(private readonly createPlayerService: CreatePlayerService) {}

  @Public()
  @Post('create')
  @HttpCode(statusCode.CREATED)
  async handle(@Body(CreatePlayerGateway) body: CreatePlayerDTO) {
    const result = await this.createPlayerService.execute(body);

    if (result.isLeft()) {
      return ErrorPresenter.toHTTP(result.value);
    }
  }
}
