import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateMasterNameDTO {
  @ApiProperty()
  @IsString()
  masterName!: string;
}
