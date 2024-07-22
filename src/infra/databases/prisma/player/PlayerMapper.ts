import { Player } from '@modules/player/entities/Player';
import { Player as PlayerPrisma, Prisma } from '@prisma/client';

export class PlayerMapper {
  static toEntity(raw: PlayerPrisma): Player {
    return new Player(
      {
        name: raw.name,
        password: raw.password,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        masterName: raw.masterName,
      },
      raw.id,
    );
  }

  static toPrisma(entity: Player): Prisma.PlayerUncheckedCreateInput {
    return {
      name: entity.name,
      password: entity.password,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt as Date,
      masterName: entity.masterName,
    };
  }
}
