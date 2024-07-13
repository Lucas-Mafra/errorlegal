import { Player } from '@modules/player/entities/Player';
import { PlayerRepository } from '@modules/player/repositories/contracts/PlayerRepository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PlayerMapper } from './PlayerMapper';

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

  async findUniqueByName(name: string): Promise<Player | null> {
    const player = await this.prisma.player.findUnique({
      where: {
        name,
      },
    });

    return player ? PlayerMapper.toEntity(player) : null;
  }
}
