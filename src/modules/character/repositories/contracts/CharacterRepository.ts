import { Character } from '@modules/character/entities/Character';
import { CharacterWithGameInfo } from '@modules/character/valueObjects/CharacterWithGameInfo';

export abstract class CharacterRepository {
  abstract findUniqueById(id: number): Promise<Character | null>;
  abstract findUniqueByNicknameAndGameId(
    nickname: string,
    gameId: number,
  ): Promise<Character | null>;

  abstract findManyByPlayerId(
    playerId: number,
    page: number,
    pageSize: number,
  ): Promise<Character[]>;

  abstract findManyByPlayerIdWithGameInfo(
    playerId: number,
    page: number,
    pageSize: number,
  ): Promise<CharacterWithGameInfo[]>;

  abstract hasCharacter(playerId: number, gameId: number): Promise<boolean>;
  abstract create(character: Character): Promise<void>;
  abstract update(character: Character): Promise<void>;
  abstract delete(id: number): Promise<void>;
}
