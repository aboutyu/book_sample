import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class ChatDto {
  @ApiProperty({ example: '오늘 저녁 뭐 먹을지 추천해줘' })
  @IsString()
  @MinLength(1)
  message: string;
}
