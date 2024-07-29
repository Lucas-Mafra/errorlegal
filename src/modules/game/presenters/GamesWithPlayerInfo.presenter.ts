import { GameWithPlayerInfo } from '../valueObjects/GameWithPlayerInfo';

export class GamesWithPlayerInfoPresenter {
  static toHTTP(games: GameWithPlayerInfo[]) {
    return {
      games: games.map((g) => ({
        playerJoinedAt: g.playerJoinedAt,
        gameName: g.gameName,
        gameMasterId: g.gameMasterId,
        gameId: g.gameId,
        playerId: g.playerId,
        isMaster: g.isMaster,
      })),
    };
  }
}
