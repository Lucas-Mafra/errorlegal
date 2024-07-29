import { ErrorPresenter } from '@infra/presenters/Error.presenter';
import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentLoggedPlayer } from '@providers/auth/decorators/CurrentLoggedPlayer.decorator';
import { TokenPayloadSchema } from '@providers/auth/strategys/jwtStrategy';
import { statusCode } from '@shared/core/types/statusCode';
import { FindCharacterByIdGateway } from '../gateways/FindGameById.gateway';
import { CharacterPresenter } from '../presenters/Character.presenter';
import { FindCharacterByIdService } from '../services/FindCharacterById.service';

@ApiTags('Character')
@Controller('character')
export class FindCharacterByIdController {
  constructor(
    private readonly findCharacterByIdService: FindCharacterByIdService,
  ) {}

  @Get('/find/:characterId')
  @HttpCode(statusCode.OK)
  async handle(
    @CurrentLoggedPlayer() { sub }: TokenPayloadSchema,
    @Param('characterId', FindCharacterByIdGateway) characterId: number,
  ) {
    const result = await this.findCharacterByIdService.execute({
      sub,
      characterId,
    });

    if (result.isLeft()) {
      return ErrorPresenter.toHTTP(result.value);
    }

    const { character } = result.value;

    return CharacterPresenter.toHTTP(character);
  }
}
