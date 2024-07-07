import { Player } from '../entities/Player';

export abstract class PlayerRepository {
  abstract findUniqueById(id: number): Promise<Player | null>;
  abstract create(player: Player): Promise<void>;
  abstract update(player: Player): Promise<void>;
  abstract delete(id: number): Promise<void>;
  abstract findUniqueByNickName(nickname: string): Promise<Player | null>;
  abstract findManyByGameId(gameId: number): Promise<Player[]>;
}
