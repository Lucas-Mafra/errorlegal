import { GameWithMasterInfo } from '../valueObjects/GameWithMasterInfo';

export class GamesWithMasterInfoPresenter {
  static toHTTP(game: GameWithMasterInfo) {
    return {
      game: {
        id: game.id,
        createdAt: game.createdAt,
        updatedAt: game.updatedAt,
        inviteCode: game.inviteCode,
        name: game.name,
        description: game.description,
        imageUrl: game.imageUrl,
        totalPlayers: game.totalPlayers,
        masterId: game.masterId,
        masterName: game.masterName,
      },
    };
  }
}
