import { IsDateString, IsNumber, IsString } from 'class-validator';

export class GameWithMasterInfoDTO {
  @IsNumber()
  id!: number;

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

  @IsNumber()
  totalPlayers!: number;

  @IsNumber()
  masterId!: number;

  @IsString()
  masterName!: string;
}
