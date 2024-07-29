import { CharacterWithGameInfoDTO } from '@modules/character/dto/CharacterWithGameInfoDTO';
import { Character } from '@modules/character/entities/Character';
import { CharacterWithGameInfo } from '@modules/character/valueObjects/CharacterWithGameInfo';
import { Character as CharacterPrisma, Prisma } from '@prisma/client';

type CharacterWithGamerInfoPrisma = CharacterWithGameInfoDTO;

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

  static toCharacterWithGameInfo(
    raw: CharacterWithGamerInfoPrisma,
  ): CharacterWithGameInfo {
    return new CharacterWithGameInfo({
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      gameId: raw.gameId,
      playerId: raw.playerId,
      nickname: raw.nickname,
      gameName: raw.gameName,
    });
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
