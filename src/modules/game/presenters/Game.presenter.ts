import { Game } from '../entities/Game';

export class GamerPresenter {
  static toHTTP(game: Game) {
    return {
      createdAt: game.createdAt,
      updatedAt: game.updatedAt,
      id: game.id,
      masterId: game.masterId,
      inviteCode: game.inviteCode,
      name: game.name,
      description: game.description,
      imageUrl: game.imageUrl,
      isActive: game.isActive,
      totalPlayers: game.totalPlayers,
      activePlayers: game.activePlayers,
    };
  }
}
