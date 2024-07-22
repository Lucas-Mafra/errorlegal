import { Game } from '@modules/game/entities/Game';

export abstract class GameRepository {
  abstract findUniqueById(id: number): Promise<Game | null>;

  abstract findManyByPlayerId(
    playerId: number,
    page: number,
    pageSize: number,
  ): Promise<Game[]>;

  abstract addPlayerToGame(playerId: number, gameId: number): Promise<void>;

  abstract removePlayerFromGame(
    playerId: number,
    gameId: number,
  ): Promise<void>;

  abstract findGameByInviteCode(inviteCode: string): Promise<Game | null>;

  abstract create(game: Game): Promise<Game>;

  abstract update(game: Game): Promise<void>;

  abstract delete(id: number): Promise<void>;
}
