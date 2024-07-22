import { Character } from '@modules/character/entities/Character';
import { CharacterRepository } from '@modules/character/repositories/contracts/CharacterRepository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CharacterMapper } from './CharacterMapper';

@Injectable()
export class CharacterRepositoryImplementation implements CharacterRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findUniqueByNickname(nickname: string): Promise<Character | null> {
    const character = await this.prisma.character.findUnique({
      where: {
        nickname,
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
