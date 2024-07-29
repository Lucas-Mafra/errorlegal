import { ErrorPresenter } from '@infra/presenters/Error.presenter';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentLoggedPlayer } from '@providers/auth/decorators/CurrentLoggedPlayer.decorator';
import { TokenPayloadSchema } from '@providers/auth/strategys/jwtStrategy';
import { statusCode } from '@shared/core/types/statusCode';
import { CreateCharacterDTO } from '../dto/CreateCharacterDTO';
import { CreateCharacterGateway } from '../gateways/CreateCharacter.gateway';
import { CreateCharacterService } from '../services/CreateCharacter.service';

@ApiTags('Character')
@Controller('character')
export class CreateCharacterController {
  constructor(
    private readonly createCharacterService: CreateCharacterService,
  ) {}

  @Post('create')
  @HttpCode(statusCode.CREATED)
  async handle(
    @CurrentLoggedPlayer() { sub }: TokenPayloadSchema,
    @Body(CreateCharacterGateway) body: CreateCharacterDTO,
  ) {
    const result = await this.createCharacterService.execute({
      ...body,
      sub,
    });

    if (result.isLeft()) {
      return ErrorPresenter.toHTTP(result.value);
    }
  }
}
