import { Game } from '@modules/game/entities/Game';
import { Game as GamePrisma, Prisma } from '@prisma/client';

export class GameMapper {
  static toEntity(raw: GamePrisma): Game {
    return new Game(
      {
        name: raw.name,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        description: raw.description,
        masterId: raw.masterId,
        inviteCode: raw.inviteCode,
        activePlayers: raw.activePlayers,
        isActive: raw.isActive,
        imageUrl: raw.imageUrl,
        totalPlayers: raw.totalPlayers,
      },
      raw.id,
    );
  }

  static toPrisma(entity: Game): Prisma.GameUncheckedCreateInput {
    return {
      name: entity.name,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt as Date,
      description: entity.description,
      masterId: entity.masterId,
      activePlayers: entity.activePlayers,
      isActive: entity.isActive,
      imageUrl: entity.imageUrl,
      totalPlayers: entity.totalPlayers,
    };
  }
}
