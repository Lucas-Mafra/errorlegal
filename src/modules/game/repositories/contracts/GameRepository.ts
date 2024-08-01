import { Game } from '@modules/game/entities/Game';
import { GameWithMasterInfo } from '@modules/game/valueObjects/GameWithMasterInfo';
import { GameWithPlayerInfo } from '@modules/game/valueObjects/GameWithPlayerInfo';

export abstract class GameRepository {
  abstract findUniqueById(id: number): Promise<Game | null>;

  abstract findUniqueByIdWithMasterInfo(
    id: number,
  ): Promise<GameWithMasterInfo | null>;

  abstract findManyByPlayerId(
    playerId: number,
    page: number,
    pageSize: number,
  ): Promise<Game[]>;

  abstract findManyByPlayerIdWithPlayerInfo(
    playerId: number,
    page: number,
    pageSize: number,
  ): Promise<GameWithPlayerInfo[]>;

  abstract addPlayerToGame(playerId: number, gameId: number): Promise<void>;

  abstract hasPlayer(playerId: number, gameId: number): Promise<boolean>;

  abstract removePlayerFromGame(
    playerId: number,
    gameId: number,
  ): Promise<void>;

  abstract findGameByInviteCode(inviteCode: string): Promise<Game | null>;

  abstract create(game: Game): Promise<Game>;

  abstract update(game: Game): Promise<void>;

  abstract delete(id: number): Promise<void>;
}
