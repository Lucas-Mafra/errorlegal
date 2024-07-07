import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePlayerDTO {
  @ApiProperty()
  @IsString()
  nickname!: string;

  @ApiProperty()
  @IsString()
  password!: string;
}
