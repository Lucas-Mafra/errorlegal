import { GameWithPlayerInfoDTO } from '@modules/game/dto/GameWithPlayerInfoDTO';
import { Game } from '@modules/game/entities/Game';
import { GameWithPlayerInfo } from '@modules/game/valueObjects/GameWithPlayerInfo';
import { Game as GamePrisma, Prisma } from '@prisma/client';

type GameWithPlayerInfoPrisma = GameWithPlayerInfoDTO;
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

  static toGameWithPlayerInfo(
    raw: GameWithPlayerInfoPrisma,
  ): GameWithPlayerInfo {
    return new GameWithPlayerInfo({
      playerJoinedAt: raw.playerJoinedAt,
      gameName: raw.gameName,
      gameMasterId: raw.gameMasterId,
      gameId: raw.gameId,
      playerId: raw.playerId,
      isMaster: raw.isMaster,
    });
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
