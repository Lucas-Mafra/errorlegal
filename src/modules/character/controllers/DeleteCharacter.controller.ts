import { ErrorPresenter } from '@infra/presenters/Error.presenter';
import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentLoggedPlayer } from '@providers/auth/decorators/CurrentLoggedPlayer.decorator';
import { TokenPayloadSchema } from '@providers/auth/strategys/jwtStrategy';
import { statusCode } from '@shared/core/types/statusCode';
import { DeleteCharacterDTO } from '../dto/DeleteCharacterDTO';
import { DeleteCharacterGateway } from '../gateways/DeleteCharacter.gateway';
import { DeleteCharacterService } from '../services/DeleteCharacter.service';

@ApiTags('Character')
@Controller('character')
export class DeleteCharacterController {
  constructor(
    private readonly deleteCharacterService: DeleteCharacterService,
  ) {}

  @Delete('/delete/:characterId')
  @HttpCode(statusCode.OK)
  async handle(
    @CurrentLoggedPlayer() { sub }: TokenPayloadSchema,
    @Param('characterId', DeleteCharacterGateway) param: DeleteCharacterDTO,
  ) {
    const result = await this.deleteCharacterService.execute({
      sub,
      characterId: param.characterId,
    });

    if (result.isLeft()) {
      return ErrorPresenter.toHTTP(result.value);
    }
  }
}
