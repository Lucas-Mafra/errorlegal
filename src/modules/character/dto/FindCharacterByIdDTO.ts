import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class FindCharacterByIdDTO {
  @ApiProperty()
  @IsNumber()
  characterId!: number;
}
