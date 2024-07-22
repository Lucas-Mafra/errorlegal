import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CharacterDTO {
  @IsDateString()
  createdAt!: Date;

  @IsDateString()
  updatedAt!: Date | null;

  @IsString()
  nickname!: string;

  @IsNumber()
  playerId!: number;

  @IsNumber()
  gameId!: number;
}
