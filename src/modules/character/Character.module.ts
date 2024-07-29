import { DatabaseModule } from '@infra/databases/Database.module';
import { Module } from '@nestjs/common';
import { CheckCharacterController } from './controllers/CheckCharacter.controller';
import { CreateCharacterController } from './controllers/CreateCharacter.controller';
import { DeleteCharacterController } from './controllers/DeleteCharacter.controller';
import { FindCharacterByIdController } from './controllers/FindCharacterById.controller';
import { FindCharacterByPlayerIdWithGameInfoController } from './controllers/FindCharacterByPlayerIdWithGameInfo.controller';
import { UpdateCharacterController } from './controllers/UpdateCharacter.controller';
import { CheckCharacterService } from './services/CheckCharacter.service';
import { CreateCharacterService } from './services/CreateCharacter.service';
import { DeleteCharacterService } from './services/DeleteCharacter.service';
import { FindCharacterByIdService } from './services/FindCharacterById.service';
import { FindCharacterByPlayerIdWithGameInfoService } from './services/FindCharacterByPlayerIdWithGameInfo.service';
import { UpdateCharacterService } from './services/UpdateGame.service';

@Module({
  controllers: [
    CreateCharacterController,
    DeleteCharacterController,
    FindCharacterByIdController,
    UpdateCharacterController,
    CheckCharacterController,
    FindCharacterByPlayerIdWithGameInfoController,
  ],
  imports: [DatabaseModule],
  providers: [
    CreateCharacterService,
    DeleteCharacterService,
    FindCharacterByIdService,
    UpdateCharacterService,
    CheckCharacterService,
    FindCharacterByPlayerIdWithGameInfoService,
  ],
})
export class CharacterModule {}
