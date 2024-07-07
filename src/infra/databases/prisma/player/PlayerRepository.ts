import { Player } from '@modules/player/entities/Player';
import { PlayerRepository } from '@modules/player/repositories/PlayerRepository';
import { Injectable } from '@nestjs/common';
import { Player as PlayerPrisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { PlayerMapper } from './playerMapper';

@Injectable()
export class PlayerRepositoryImplementation implements PlayerRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findUniqueById(id: number): Promise<Player | null> {
    const player = await this.prisma.player.findUnique({
      where: {
        id,
      },
    });

    return player ? PlayerMapper.toEntity(player) : null;
  }

  async create(player: Player): Promise<void> {
    await this.prisma.player.create({
      data: PlayerMapper.toPrisma(player),
    });
  }

  async update(player: Player): Promise<void> {
    await this.prisma.player.update({
      where: {
        id: player.id as number,
      },
      data: PlayerMapper.toPrisma(player),
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.player.delete({
      where: {
        id,
      },
    });
  }

  async findUniqueByNickName(nickname: string): Promise<Player | null> {
    const player = await this.prisma.player.findUnique({
      where: {
        nickname,
      },
    });

    return player ? PlayerMapper.toEntity(player) : null;
  }

  async findManyByGameId(gameId: number): Promise<Player[]> {
    const players = await this.prisma.player.findMany({
      where: {
        gameId,
      },
    });

    return players.map((player: PlayerPrisma) => PlayerMapper.toEntity(player));
  }
}
