import { ErrorPresenter } from '@infra/presenters/Error.presenter';
import { Body, Controller, HttpCode, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentLoggedPlayer } from '@providers/auth/decorators/CurrentLoggedPlayer.decorator';
import { TokenPayloadSchema } from '@providers/auth/strategys/jwtStrategy';
import { statusCode } from '@shared/core/types/statusCode';
import { UpdateMasterNameDTO } from '../dto/UpdateMasterNameDTO';
import { UpdateMasterNameGateway } from '../gateways/UpdateMasterName.gateway';
import { UpdateMasterNameService } from '../services/UpdateMasterName.service';

@ApiTags('Player')
@Controller('player')
export class UpdateMasterNameController {
  constructor(
    private readonly updateMasterNameService: UpdateMasterNameService,
  ) {}

  @Patch('/update/mastername')
  @HttpCode(statusCode.NO_CONTENT)
  async handle(
    @CurrentLoggedPlayer() { sub }: TokenPayloadSchema,
    @Body(UpdateMasterNameGateway) { masterName }: UpdateMasterNameDTO,
  ) {
    const result = await this.updateMasterNameService.execute({
      masterName,
      sub,
    });

    if (result.isLeft()) {
      return ErrorPresenter.toHTTP(result.value);
    }
  }
}
