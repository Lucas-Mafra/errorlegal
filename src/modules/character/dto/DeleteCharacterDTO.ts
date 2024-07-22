import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class DeleteCharacterDTO {
  @ApiProperty()
  @IsNumber()
  characterId!: number;
}
