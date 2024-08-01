import { Game } from '@modules/game/entities/Game';
import { GameRepository } from '@modules/game/repositories/contracts/GameRepository';
import { GameWithMasterInfo } from '@modules/game/valueObjects/GameWithMasterInfo';
import { GameWithPlayerInfo } from '@modules/game/valueObjects/GameWithPlayerInfo';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { GameMapper } from './GameMapper';

@Injectable()
export class GameRepositoryImplementation implements GameRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUniqueByIdWithMasterInfo(
    id: number,
  ): Promise<GameWithMasterInfo | null> {
    const gameWithMasterInfo = await this.prisma.game.findUnique({
      where: {
        id,
      },
      include: {
        master: {
          select: {
            id: true,
            masterName: true,
          },
        },
      },
    });

    return gameWithMasterInfo
      ? GameMapper.toGameWithMasterInfo({
          ...gameWithMasterInfo,
          masterId: gameWithMasterInfo.master.id,
          masterName: gameWithMasterInfo.master.masterName!,
        })
      : null;
  }

  async hasPlayer(playerId: number, gameId: number): Promise<boolean> {
    const playerGame = await this.prisma.playerGame.findFirst({
      where: { playerId, gameId },
    });

    return Boolean(playerGame);
  }

  async addPlayerToGame(playerId: number, gameId: number) {
    await this.prisma.playerGame.create({
      data: { playerId, gameId, joinedAt: new Date() },
    });

    await this.prisma.game.update({
      where: { id: gameId },
      data: {
        totalPlayers: {
          increment: 1,
        },
      },
    });
  }

  async removePlayerFromGame(playerId: number, gameId: number) {
    await this.prisma.playerGame.deleteMany({
      where: { playerId, gameId },
    });

    await this.prisma.game.update({
      where: { id: gameId },
      data: {
        totalPlayers: {
          decrement: 1,
        },
      },
    });
  }

  async findGameByInviteCode(inviteCode: string): Promise<Game | null> {
    const game = await this.prisma.game.findUnique({
      where: {
        inviteCode,
      },
    });

    return game ? GameMapper.toEntity(game) : null;
  }

  async findManyByPlayerId(
    playerId: number,
    page: number,
    pageSize: number,
  ): Promise<Game[]> {
    const games = await this.prisma.playerGame.findMany({
      where: {
        playerId,
      },
      select: {
        Game: true,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        Game: {
          createdAt: 'desc',
        },
      },
    });

    return games.map((game) => GameMapper.toEntity(game.Game));
  }

  async findManyByPlayerIdWithPlayerInfo(
    playerId: number,
    page: number,
    pageSize: number,
  ): Promise<GameWithPlayerInfo[]> {
    const playerGames = await this.prisma.playerGame.findMany({
      where: {
        playerId,
      },
      include: {
        Game: {
          select: {
            id: true,
            name: true,
            masterId: true,
          },
        },
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        joinedAt: 'desc',
      },
    });

    return playerGames.map((playerGame) => {
      const game = playerGame.Game;

      return GameMapper.toGameWithPlayerInfo({
        playerJoinedAt: playerGame.joinedAt,
        gameName: game.name,
        gameMasterId: game.masterId,
        gameId: game.id,
        playerId: playerGame.playerId,
        isMaster: playerGame.playerId === game.masterId,
      });
    });
  }

  async findUniqueById(id: number): Promise<Game | null> {
    const game = await this.prisma.game.findUnique({
      where: {
        id,
      },
    });

    return game ? GameMapper.toEntity(game) : null;
  }

  async create(game: Game): Promise<Game> {
    const _game = await this.prisma.game.create({
      data: GameMapper.toPrisma(game),
    });

    return GameMapper.toEntity(_game);
  }

  async update(game: Game): Promise<void> {
    await this.prisma.game.update({
      where: {
        id: game.id as number,
      },
      data: GameMapper.toPrisma(game),
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.game.delete({
      where: {
        id,
      },
    });
  }
}
