import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FindGameByInviteCodeDTO {
  @ApiProperty()
  @IsString()
  inviteCode!: string;
}
