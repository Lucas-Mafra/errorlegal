import { ErrorPresenter } from '@infra/presenters/Error.presenter';
import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentLoggedPlayer } from '@providers/auth/decorators/CurrentLoggedPlayer.decorator';
import { TokenPayloadSchema } from '@providers/auth/strategys/jwtStrategy';
import { statusCode } from '@shared/core/types/statusCode';
import { CheckCharacterService } from '../services/CheckCharacter.service';

@ApiTags('Character')
@Controller('character')
export class CheckCharacterController {
  constructor(private readonly checkCharacterService: CheckCharacterService) {}

  @Get('check-character/:gameId')
  @HttpCode(statusCode.OK)
  async handle(
    @CurrentLoggedPlayer() { sub }: TokenPayloadSchema,
    @Param('gameId') gameId: string,
  ) {
    const result = await this.checkCharacterService.execute({
      sub,
      gameId: Number(gameId),
    });

    if (result.isLeft()) {
      return ErrorPresenter.toHTTP(result.value);
    }

    const { hasCharacter } = result.value;

    return hasCharacter;
  }
}
