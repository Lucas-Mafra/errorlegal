import { Character } from '@modules/character/entities/Character';
import { Character as CharacterPrisma, Prisma } from '@prisma/client';

export class CharacterMapper {
  static toEntity(raw: CharacterPrisma): Character {
    return new Character(
      {
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        nickname: raw.nickname,
        playerId: raw.playerId,
        gameId: raw.gameId,
      },
      raw.id,
    );
  }

  static toPrisma(entity: Character): Prisma.CharacterUncheckedCreateInput {
    return {
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt as Date,
      nickname: entity.nickname,
      playerId: entity.playerId,
      gameId: entity.gameId,
    };
  }
}
