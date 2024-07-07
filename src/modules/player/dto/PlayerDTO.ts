import { IsDate, IsNumber, IsString } from 'class-validator';

export class PlayerDTO {
  @IsDate()
  createdAt!: Date;

  @IsDate()
  updatedAt!: Date | null;

  @IsString()
  nickname!: string;

  @IsString()
  password!: string;

  @IsNumber()
  gameId!: number | null;

  @IsNumber()
  roleId!: number;
}
