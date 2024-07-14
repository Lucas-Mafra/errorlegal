import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class FindGameByIdDTO {
  @ApiProperty()
  @IsNumber()
  gameId!: number;
}
