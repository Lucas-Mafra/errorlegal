import { IsDate, IsNumber, IsString } from 'class-validator';

export class PlayerDTO {
  @IsDate()
  createdAt!: Date;

  @IsDate()
  updatedAt!: Date | null;

  @IsString()
  name!: string;

  @IsString()
  password!: string;

  @IsString()
  masterName!: string | null;

  @IsNumber()
  characters!: number[];

  @IsNumber()
  gamesAsMaster!: number[];
}
