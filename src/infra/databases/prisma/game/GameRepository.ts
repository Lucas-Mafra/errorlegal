import { Game } from '@modules/game/entities/Game';
import { GameRepository } from '@modules/game/repositories/contracts/GameRepository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { GameMapper } from './GameMapper';

@Injectable()
export class GameRepositoryImplementation implements GameRepository {
  constructor(private readonly prisma: PrismaService) {}

  async addPlayerToGame(playerId: number, gameId: number) {
    await this.prisma.playerGame.create({
      data: { playerId, gameId },
    });
  }

  async removePlayerFromGame(playerId: number, gameId: number) {
    await this.prisma.playerGame.deleteMany({
      where: { playerId, gameId },
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
