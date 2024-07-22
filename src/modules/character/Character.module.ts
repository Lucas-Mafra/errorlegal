import { DatabaseModule } from '@infra/databases/Database.module';
import { Module } from '@nestjs/common';
import { CreateCharacterController } from './controllers/CreateCharacter.controller';
import { DeleteCharacterController } from './controllers/DeleteCharacter.controller';
import { FindCharacterByIdController } from './controllers/FindCharacterById.controller';
import { UpdateCharacterController } from './controllers/UpdateCharacter.controller';
import { CreateCharacterService } from './services/CreateCharacter.service';
import { DeleteCharacterService } from './services/DeleteCharacter.service';
import { FindCharacterByIdService } from './services/FindCharacterById.service';
import { UpdateCharacterService } from './services/UpdateGame.service';

@Module({
  controllers: [
    CreateCharacterController,
    DeleteCharacterController,
    FindCharacterByIdController,
    UpdateCharacterController,
  ],
  imports: [DatabaseModule],
  providers: [
    CreateCharacterService,
    DeleteCharacterService,
    FindCharacterByIdService,
    UpdateCharacterService,
  ],
})
export class CharacterModule {}
