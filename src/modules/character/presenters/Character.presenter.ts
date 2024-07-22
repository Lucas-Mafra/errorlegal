import { Character } from '../entities/Character';

export class CharacterPresenter {
  static toHTTP(character: Character) {
    return {
      id: character.id,
      createdAt: character.createdAt,
      updatedAt: character.updatedAt,
      nickname: character.nickname,
      playerId: character.playerId,
      gameId: character.gameId,
    };
  }
}
