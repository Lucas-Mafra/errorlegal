import { CharacterWithGameInfo } from '../valueObjects/CharacterWithGameInfo';

export class CharactersWithGameInfoPresenter {
  static toHTTP(character: CharacterWithGameInfo[]) {
    return {
      characters: character.map((c) => ({
        gameName: c.gameName,
        nickname: c.nickname,
        playerId: c.playerId,
        gameId: c.gameId,
        createdAt: c.createdAt,
        updatedAt: c.updatedAt,
      })),
    };
  }
}
