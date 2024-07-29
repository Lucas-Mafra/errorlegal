import { Character } from '@modules/character/entities/Character';
import { CharacterRepository } from '@modules/character/repositories/contracts/CharacterRepository';
import { CharacterWithGameInfo } from '@modules/character/valueObjects/CharacterWithGameInfo';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CharacterMapper } from './CharacterMapper';

@Injectable()
export class CharacterRepositoryImplementation implements CharacterRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findManyByPlayerId(
    playerId: number,
    page: number,
    pageSize: number,
  ): Promise<Character[]> {
    const characters = await this.prisma.character.findMany({
      where: {
        playerId,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return characters.map(CharacterMapper.toEntity);
  }

  async findManyByPlayerIdWithGameInfo(
    playerId: number,
    page: number,
    pageSize: number,
  ): Promise<CharacterWithGameInfo[]> {
    const characters = await this.prisma.character.findMany({
      where: {
        playerId,
      },
      include: {
        Game: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return characters.map((character) => {
      const game = character.Game;

      return CharacterMapper.toCharacterWithGameInfo({
        createdAt: character.createdAt,
        updatedAt: character.updatedAt,
        gameId: character.gameId,
        playerId: character.playerId,
        nickname: character.nickname,
        gameName: game.name,
      });
    });
  }

  async hasCharacter(playerId: number, gameId: number): Promise<boolean> {
    const character = await this.prisma.character.findFirst({
      where: { playerId, gameId },
    });

    return Boolean(character);
  }

  async findUniqueByNicknameAndGameId(
    nickname: string,
    gameId: number,
  ): Promise<Character | null> {
    const character = await this.prisma.character.findFirst({
      where: {
        nickname,
        gameId,
      },
    });

    return character ? CharacterMapper.toEntity(character) : null;
  }

  async findUniqueById(id: number): Promise<Character | null> {
    const character = await this.prisma.character.findUnique({
      where: {
        id,
      },
    });

    return character ? CharacterMapper.toEntity(character) : null;
  }

  async create(character: Character): Promise<void> {
    await this.prisma.character.create({
      data: CharacterMapper.toPrisma(character),
    });
  }

  async update(character: Character): Promise<void> {
    await this.prisma.character.update({
      where: {
        id: character.id as number,
      },
      data: CharacterMapper.toPrisma(character),
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.character.delete({
      where: {
        id,
      },
    });
  }
}
