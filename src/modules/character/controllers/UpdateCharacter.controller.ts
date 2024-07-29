import { ErrorPresenter } from '@infra/presenters/Error.presenter';
import { Body, Controller, Get, HttpCode, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentLoggedPlayer } from '@providers/auth/decorators/CurrentLoggedPlayer.decorator';
import { TokenPayloadSchema } from '@providers/auth/strategys/jwtStrategy';
import { statusCode } from '@shared/core/types/statusCode';
import { UpdateCharacterDTO } from '../dto/UpdateCharacterDTO';
import { CreateCharacterGateway } from '../gateways/CreateCharacter.gateway';
import { UpdateCharacterService } from '../services/UpdateGame.service';

@ApiTags('Character')
@Controller('character')
export class UpdateCharacterController {
  constructor(
    private readonly updateCharacterService: UpdateCharacterService,
  ) {}

  @Get('/update/:characterId')
  @HttpCode(statusCode.OK)
  async handle(
    @CurrentLoggedPlayer() { sub }: TokenPayloadSchema,
    @Param(':characterId', CreateCharacterGateway) param: string,
    @Body() { nickname }: UpdateCharacterDTO,
  ) {
    const result = await this.updateCharacterService.execute({
      sub,
      nickname,
      characterId: Number(param),
    });

    if (result.isLeft()) {
      return ErrorPresenter.toHTTP(result.value);
    }
  }
}
