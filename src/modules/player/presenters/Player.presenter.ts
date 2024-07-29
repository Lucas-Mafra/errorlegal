import { Player } from '../entities/Player';

export class PlayerPresenter {
  static toHTTP(player: Player) {
    return {
      id: player.id,
      name: player.name,
      masterName: player.masterName,
      createdAt: player.createdAt,
      updatedAt: player.updatedAt,
    };
  }
}
