import { IsString } from 'class-validator';
import { CharacterDTO } from './CharacterDTO';

export class CharacterWithGameInfoDTO extends CharacterDTO {
  @IsString()
  gameName!: string;
}
