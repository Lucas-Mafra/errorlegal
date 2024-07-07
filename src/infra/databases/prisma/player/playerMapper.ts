import { Player } from '@modules/player/entities/Player';
import { Player as PlayerPrisma, Prisma } from '@prisma/client';

export class PlayerMapper {
  static toEntity(raw: PlayerPrisma): Player {
    return new Player(
      {
        nickname: raw.nickname,
        password: raw.password,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        gameId: raw.gameId as number,
        roleId: raw.roleId as number,
      },
      raw.id,
    );
  }

  static toPrisma(entity: Player): Prisma.PlayerCreateInput {
    return {
      nickname: entity.nickname,
      password: entity.password,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt as Date,
    };
  }
}
