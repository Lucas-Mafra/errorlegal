import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class DeletePlayerDTO {
  @ApiProperty()
  @IsNumber()
  id!: number;
}
