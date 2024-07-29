import { IsBoolean, IsDateString, IsNumber, IsString } from 'class-validator';

export class GameWithPlayerInfoDTO {
  @IsDateString()
  playerJoinedAt!: Date;

  @IsString()
  gameName!: string;

  @IsNumber()
  gameMasterId!: number;

  @IsNumber()
  gameId!: number;

  @IsNumber()
  playerId!: number;

  @IsBoolean()
  isMaster!: boolean;
}
