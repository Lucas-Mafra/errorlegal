import { IsBoolean, IsDateString, IsNumber, IsString } from 'class-validator';

export class GameDTO {
  @IsDateString()
  createdAt!: Date;

  @IsDateString()
  updatedAt!: Date | null;

  @IsString()
  inviteCode!: string;

  @IsString()
  name!: string;

  @IsString()
  description!: string;

  @IsString()
  imageUrl!: string | null;

  @IsBoolean()
  isActive!: boolean;

  @IsNumber()
  totalPlayers!: number;

  @IsNumber()
  activePlayers!: number;

  @IsNumber()
  masterId!: number;
}
