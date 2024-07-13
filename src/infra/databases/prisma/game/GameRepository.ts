import { Game } from '@modules/game/entities/Game';
import { GameRepository } from '@modules/game/repositories/contracts/GameRepository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { GameMapper } from './GameMapper';

@Injectable()
export class GameRepositoryImplementation implements GameRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUniqueById(id: number): Promise<Game | null> {
    const player = await this.prisma.game.findUnique({
      where: {
        id,
      },
    });

    return player ? GameMapper.toEntity(player) : null;
  }

  async create(game: Game): Promise<void> {
    await this.prisma.game.create({
      data: GameMapper.toPrisma(game),
    });
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
