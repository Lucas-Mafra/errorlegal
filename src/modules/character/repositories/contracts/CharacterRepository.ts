import { Character } from '@modules/character/entities/Character';

export abstract class CharacterRepository {
  abstract findUniqueById(id: number): Promise<Character | null>;
  abstract findUniqueByNickname(nickname: string): Promise<Character | null>;
  abstract create(character: Character): Promise<void>;
  abstract update(character: Character): Promise<void>;
  abstract delete(id: number): Promise<void>;
}
