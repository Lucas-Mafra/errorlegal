import { Game } from '../entities/Game';

export class GamesPresenter {
  static toHTTP(game: Game) {
    return {
      id: game.id,
      masterId: game.masterId,
      inviteCode: game.inviteCode,
      name: game.name,
      description: game.description,
      createdAt: game.createdAt,
    };
  }
}
