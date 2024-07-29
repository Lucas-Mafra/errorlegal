import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdateCharacterDTO {
  @ApiProperty()
  @IsNumber()
  nickname!: string;
}
