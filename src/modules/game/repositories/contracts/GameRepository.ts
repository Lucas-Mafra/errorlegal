import { Game } from '@modules/game/entities/Game';

export abstract class GameRepository {
  abstract findUniqueById(id: number): Promise<Game | null>;
  abstract create(game: Game): Promise<void>;
  abstract update(game: Game): Promise<void>;
  abstract delete(id: number): Promise<void>;
}
