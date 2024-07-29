import { ErrorPresenter } from '@infra/presenters/Error.presenter';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@providers/auth/decorators/IsPublic.decorator';
import { statusCode } from '@shared/core/types/statusCode';
import { LoginPlayerDTO } from '../dto/LoginPlayerDTO';
import { LoginPlayerGateway } from '../gateways/LoginPlayer.gateway';
import { TokensPresenter } from '../presenters/LoginPlayer.presenter';
import { LoginPlayerService } from '../services/LoginPlayer.service';

@ApiTags('Player')
@Controller('player')
export class LoginPlayerController {
  constructor(private readonly loginPlayerService: LoginPlayerService) {}

  @Public()
  @Post('login')
  @HttpCode(statusCode.OK)
  async handle(@Body(LoginPlayerGateway) body: LoginPlayerDTO) {
    const result = await this.loginPlayerService.execute(body);

    if (result.isLeft()) {
      return ErrorPresenter.toHTTP(result.value);
    }

    return TokensPresenter.toHTTP(result.value);
  }
}
