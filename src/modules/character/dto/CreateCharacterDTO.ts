import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCharacterDTO {
  @ApiProperty()
  @IsString()
  nickname!: string;

  @ApiProperty()
  @IsNumber()
  gameId!: number;
}
